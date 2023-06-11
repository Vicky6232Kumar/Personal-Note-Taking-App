const express = require('express')
const router = express.Router()
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRECT = "cviktlfndsfvk34r@&&djfvieo"



// Route 1 : Creating a user profile

router.post('/createuser',
  body('name').isLength({ min: 4 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }), async (req, res) => {

    // If there is any error then they return bad request
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {


      let user = await User.findOne({ email: req.body.email })
      // checking whether user email already exist or not
      if (user) {
        return res.status(400).json({ success, error: "Sorry the user email already exists" })
      }

      const salt = await bcrypt.genSaltSync(10);
      const secrectPassword = await bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secrectPassword
      })

      const data = {
        user: {
          id: user.id
        }
      }
      var authToken = jwt.sign(data, JWT_SECRECT);
      success = true
      res.json({ success, authToken })
      // res.json({ "ok": "Account Created" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ "error": "API Internal Error" }) // return this when any api error is occured
    }
  })


// Route 2 : User login API




router.post('/login',
  body('email').isEmail(),
  body('password', "Please enter a correct password").exists(), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: "Email doesn't exist" })
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        success = false;
        return res.status(400).json({ success, error: "Please login with correct credential" })
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRECT);
      success = true;
      res.json({ success, authToken })

    } catch (error) {
      console.log(error)
      res.status(500).json({ "error": "API Internal Error" }) // return this when any api error is occured
    }

  })



// Route 3 : Getting user data using valid token


router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    res.status(500).json({ "error": "API Internal Error" })
  }
})


module.exports = router