const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/signup', (req, res) => {
  User.findOne({ username: req.body.username }, async (err, userExists) => {
    if (err) return res.status(500).send(err)
    if (userExists) return res.status(400).send({ errorMsg: 'username already exists' })

    console.log(`username: ${req.body.username}, password: ${req.body.password}`)

    const user = await User.signUp(req.body.username, req.body.password)
    res.status(201).send(user.sanitize())
  })
})

router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, async (err, user) => {
    if (err) return res.status(500).send(err)
    if (!user || !user.comparePassword(req.body.password)) return res.status(400).send({ errorMsg: 'Invalid login information' })

    const token = jwt.sign({
      _id: user._id
    }, 'CHANGEME!')

    res.send({ token })
  })
})

module.exports = router