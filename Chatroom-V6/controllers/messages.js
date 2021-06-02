const Message = require('../Models/messages')
const authenticate = require('../helpers/jwtMiddleware')
const express = require('express')
const router = express.Router()

router.get('/messages', [authenticate], (req, res) => {
  Message.find({})
  //.populate() is tying a user to this message
    .populate('user', 'username')
    .exec((err, messages) => {
      if (err) return res.status(500).send(err)
      //messages is being returned to the front end
      // console.log(messages)
      return res.send( messages )
    })
})

module.exports = router