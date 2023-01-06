const jwt = require("jsonwebtoken");

// access and refresh token
const generateAccessToken = (user) => {
  var accessToken = jwt.sign({ email: user.email }, "createaccesstoken", {
    expiresIn: "20s",
  });
  return accessToken;
};

const generateRefreshToken = (user) => {
  var refreshToken = jwt.sign({ email: user.email }, "createrefreshtoken");
  return refreshToken;
};

// verifying token
const verifying = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      
      const token = authHeader.split(" ")[1];

      jwt.verify(token, "createtoken", (err, user) => {
        if (err) {
          return res.json({ message: "token is not valid" });
        }
        req.user = user;
  
        next();
      });
    } else {
      res.json({ message: "you are not authorized" });
    }
  } catch (err) {}
};

module.exports = { generateAccessToken ,generateRefreshToken, verifying };
