const express = require("express");
const app = express();
const session = require("express-session");
const crypto = require("crypto");
const morgan = require("morgan");
const SequelizeStore = require("connect-session-sequelize");
const cors = require("cors");

const sequelize = require("./src/database");

require("dotenv").config();

const authRouter = require("./src/routes/authRoute");
const userRouter = require("./src/routes/userRoute");

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: sequelize,
});

app.use(
  session({
    secret: crypto.randomBytes(32).toString("hex"), // Change this to a secure secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      
    },
    store: store,
  })
);

app.use(morgan("tiny"));
// const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(authRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on http://localhost:${process.env.PORT}`);
// });

//  i run to para automatic gawin yung db tables  gege
sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized with the database");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing models with the database:", error);
  });
