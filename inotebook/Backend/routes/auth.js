const express = require("express");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");
const User = require("../Models/Users"); // Ensure the path is correct for your setup
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "Devisagood$boy";
const fetchuser = require("../MiddleWare/fetchuser");

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Name length should be at least 3 characters").isLength({
      min: 3,
    }),
    body(
      "password",
      "Password length should be at least 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are validation errors, return a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwt_data = JWT.sign(data, JWT_SECRET);
      console.log(jwt_data);

      // Return the created user as a response
      res.json(user);
    } catch (error) {
      {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

// ROUTE 2 :
// Endpoint for authenticating the user:
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blanck").exists(),
  ],
  async (req, res) => {
    // If there are validation errors, return a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the email exists
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Check whether the password is correct
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Return the created user as a response
      // res.json(user);

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwt_data = JWT.sign(data, JWT_SECRET);
      res.json({ Auth_Token: jwt_data });
    } catch (error) {
      {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

//ROUTE 3: Get logeed in user (login required)

router.post("/getuser",fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
