let jwt = require("jsonwebtoken");
let JWT_SECRET = "KL;FJSLJF dsalj daOH h gjgu fuf ufuafsg_SAd0";
exports.gurd = (req, res, next) => {
  let token = req.header("Authorization");
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    console.log(err);
  }
};
