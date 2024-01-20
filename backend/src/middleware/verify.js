const User = require("../database/model/user");

const verify = async (req, res, next) => {
  console.log("active user id: " + req.session.userId);
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login first! or be a guest" });
  }
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist!" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Something went wrong in server ${error}` });
  }
};

module.exports = verify;
