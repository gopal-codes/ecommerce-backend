const express = require("express");
const router = express.Router();
const multer = require("multer");
const { User } = require("../AllSchema/UserSchema");
const { UserEmail } = require("../AllSchema/Emailschema");
const { setToken, setRefreshToken } = require("../OtherFunctions/JWTtoken");
const { generateAccessToken,generateRefreshToken } = require("../OtherFunctions/JWTtokenGenerate");
const { Products } = require("../AllSchema/SellSchema");


// for Collecting Emails..
router.post("/Newsletter", (req, res) => {
  const { email } = req.body;
  UserEmail.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "Thanks.., you have already submitted your email" });
    } else {
      const Data = new UserEmail({
        email: email,
      });
      Data.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Email Added Sucessfully." });
        }
      });
    }
  });
});

// multer configration for image upload.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
// for register...
router.post("/register", upload.single("myfile"), (req, res) => {
  const { name, email, password } = req.body;
  const profile = req.file ? req.file.filename : null;
  // checking if User already exist .. using findOne function of mongodb. else registering user.
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
        profile,
      });
      //saving user created from User model..that contains form data..
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "sucessfully registered please Login now." });
        }
      });
    }
  });
});

// login route is here......
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        var token = generateAccessToken(user);
        var rtoken = generateRefreshToken(user)
        setToken(token);
        setRefreshToken(rtoken);
        res.send({
          message: "login Successful",
          email: user.email,
          token: token,
          rtoken:rtoken
        });
      } else {
        res.send({ message: "password didn't match" });
      }
    } else {
      res.send({ message: "User not registered  go and register first" });
    }
  });
});

// multer configration for image upload.
const location = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/productimages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const productimage = multer({ storage: location });

router.post("/sellproducts", productimage.single("myfile"), (req, res) => {
  const { catogories, title, description, price, id } = req.body;
  const product = req.file ? req.file.filename : null;
  try {
    const sellproduct = new Products({
      catogories,
      title,
      description,
      price,
      product,
      id,
    });
    //saving user created from User model..that contains form data..
    sellproduct.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successfully Added To Market Product." });
      }
    });
  } catch (err) {}
});

router.get("/latest", (req, res) => {
  Products.find({}, (err, product) => {
    if (product) {
      res.json({ product: product });
    }
  });
});


module.exports = router;
