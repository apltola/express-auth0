const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const { auth } = require('express-openid-connect')
const { requiresAuth } = require('express-openid-connect')
const authConfig = require('./config/auth')
const { currentUserRouter } = require('./routes/auth/currentUser')

const app = express()
app.use(cors())
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig))
app.use(currentUserRouter)

// req.isAuthenticated is provided from the auth router
/* app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
}) */

app.get('/profile', requiresAuth(), (req, res) => {
  console.log(req.oidc.user)
  res.send(JSON.stringify(req.oidc.user))
})

app.get('/jee', (req, res) => {
  res.send('morooo')
})

if (process.env.NODE_ENV === 'production') {
  const build = path.resolve(__dirname, 'client', 'build')
  app.use('/', express.static(build))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(build, 'index.html'))
  })
}

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`server listening at ${PORT}`))
