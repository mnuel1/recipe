const express = require('express');
const app = express();
const session = require('express-session');
const crypto = require('crypto');
const morgan = require('morgan');
const SequelizeStore = require('connect-session-sequelize');
const cors = require('cors');

const sequelize = require('./src/database')
// const Like = require('./src/database/model/like')
// const Comment = require('./src/database/model/Comment')
// const Reply = require('./src/database/model/Reply')

require('dotenv').config();

const authRouter = require('./src/routes/authRoute');
const userRouter = require('./src/routes/userRoute');

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: sequelize
});

app.use(session({
    secret: crypto.randomBytes(32).toString('hex'), // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));


app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(authRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//  i run to para automatic gawin yung db tables  gege
// remove { force: true } if done changing the db
// add it if di pa naiiba yung db para maupdate yung tables
// be careful since i drodrop yung mga tables if na run yan
// sequelize.sync({ force: true })
//     .then(() => {
//         console.log('Models synchronized with the database');

    
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on http://localhost:${process.env.PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error('Error synchronizing models with the database:', error);
// });

// if ayaw mag sync gamit nung nasa taas yung new tables pa uncomment nalang eto
// and yung mga nasa taas na require

// Like.sync()
//     .then(() => {
//         console.log('Like table synchronized with the database');
//     })
//     .catch((error) => {
//         console.error('Error synchronizing Like table with the database:', error);
//     });



// Comment.sync()
//     .then(() => {
//         console.log('Like table synchronized with the database');
//     })
//     .catch((error) => {
//         console.error('Error synchronizing Like table with the database:', error);
//     });


// Reply.sync()
//     .then(() => {
//         console.log('Like table synchronized with the database');
//     })
//     .catch((error) => {
//         console.error('Error synchronizing Like table with the database:', error);
//     });