const User = require( "../database/model/user")
const bcrypt = require('bcrypt');

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
        
        await bcrypt.compare(user.dataValues.password, req.body.username, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(404).json({ msg: "Something went wrong. Please try again later!" });
            } 
            if (!result) {
                return res.status(401).json({ msg: "Wrong Password!" });
            }         
        });
    
        req.session.userId = user.dataValues.id;
    
        res.status(200).json({
            id: user.dataValues.id,
            name: user.dataValues.name,
            username: user.dataValues.username,
            msg: "Login Successful!"
        })
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
    Login,
    Logout
}