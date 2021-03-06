const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')

const app = express()
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('hello hello')
})

app.get('/html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'html', 'index.html'))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`server listening at ${PORT}`))

