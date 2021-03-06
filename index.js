const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const { auth } = require('express-openid-connect')
const { requiresAuth } = require('express-openid-connect')
const authConfig = require('./config/auth')

const app = express()
app.use(cors())
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig))

// req.isAuthenticated is provided from the auth router
/* app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
}) */

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.resolve(__dirname, 'client', 'build')
  app.use('/', express.static(buildPath))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'))
  })
}

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`server listening at ${PORT}`))
