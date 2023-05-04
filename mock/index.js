const express = require('express')
var cors = require('cors')
const app = express()
const port = 8000

app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
  })
)
app.use(express.json())

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  if (email == 'mor@innplaylabs.com' && password == 'AB12345678') {
    res.json({
      id: 1,
      name: 'John Doe',
      avatar: '/demo/Image.png',
      access_token: 'BJXPXtfJGEdBFSPttXwhgQFOwwJBHMhbDsyghhCRocNBoGoGPbkqfvlvYglb',
      refresh_token: '111',
    })
  } else {
    res.status(403).json({
      message: 'Invalid username or password',
    })
  }

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
