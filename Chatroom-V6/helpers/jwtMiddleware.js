const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = (req, res, next) => {
  const authorization = req.header('Authorization') || ''
  const [type, token] = authorization.split(' ')

  try {
    if (type === 'Bearer' && jwt.verify(token, 'CHANGEME!')) {
      console.log('before decoding in jwtmiddleware')
      const payload = jwt.decode(token, 'CHANGEME!')
      console.log('after decoding')

      User.findOne({ _id: payload._id }, (err, userDoc) => {
        if (err) return res.status(500).send(err)
        req.user = userDoc
        return next()
      })
    } else {
      console.log('line 18')
      res.status(401).send('Unauthorized -line 18')
    }
  } catch (err) {
    console.log(err)
    res.status(401).send('Unauthorized -line 21')
  }
}

module.exports = authenticate