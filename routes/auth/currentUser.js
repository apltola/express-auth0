const express = require('express')

const router = express.Router()

router.get('/api/currentuser', (req, res) => {
  const user = req.oidc?.user
  console.log('CURRENT_USER --> ', user)
  if (!user) {
    return res.send(null)
  }
  res.json(user)
})

module.exports = {
  currentUserRouter: router
}
