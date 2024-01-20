const User = require( "../database/model/user")
const bcrypt = require('bcrypt');

const Register = async(req, res) => {
    try {        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        });
    
        return res.status(200).json({
            id: user.dataValues.id,
            name: user.dataValues.name,
            username: user.dataValues.username,
            password: user.dataValues.password,
            msg: "Registration Successful!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong!" });
    }
}

const Login = async(req, res) => {

    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
    
        if (!user) {
            
            return res.status(401).json({ msg: "Username doesn't exist!" });
        }
        
        bcrypt.compare(req.body.password, user.dataValues.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(404).json({ msg: "Something went wrong. Please try again later!" });
            }
            if (!result) {
                return res.status(401).json({ msg: "Wrong Password!" });
            }

            req.session.userId = user.dataValues.id;

            return res.status(200).json({
                id: user.dataValues.id,
                name: user.dataValues.name,
                username: user.dataValues.username,
                msg: "Login Successful!"
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something went wrong!" });
    }
    

}


const Logout = async(req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error during logout');
        } else {          
            res.status(200).send('Logout successful');
        }
    });
}



module.exports = {
    Register,
    Login,
    Logout
}