const authModel = require("../model/auth.model");
const bycrpt = require("bcrypt");
let jwt = require("jsonwebtoken");
let JWT_SECRET = "KL;FJSLJF dsalj daOH h gjgu fuf ufuafsg_SAd0";
exports.signup = async (req, res, next) => {
  const check = await authModel.findOne({ email: req.body.email });
  if (check !== null) {
    res.json({
      msg: "You Have an acount",
    });
  } else {
    const user = new authModel();
    const hashedPassword = await bycrpt.hash(req.body.password, 10);
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = hashedPassword;
    let data = await user.save();
    res.json({
      data: data,
    });
  }
};
exports.signin = async (req, res, next) => {
  const check = await authModel.findOne({ email: req.body.email });
  const compare = bycrpt.compare(req.body.password, check.password);
  if (check !== null) {
    if (compare) {
      let token = jwt.sign(
        {
          id: check._id,
          name: check.name,
          email: check.email,
        },
        JWT_SECRET
      );
      res.json({
        token: token,
        user_id: check._id,
        name: check.name,
        email: check.email,
      });
    } else {
      res.json({
        msg: "You Have a mistake in Password",
      });
    }
  } else {
    res.json({
      msg: "You Don't Have an Acount",
    });
  }
};
exports.getUsers = async (req, res, next) => {
  const users = await authModel.find({});
  res.json({
    users: users,
  });
};
