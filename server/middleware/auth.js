const jwt = require("jsonwebtoken");

const check = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

module.exports = check;
