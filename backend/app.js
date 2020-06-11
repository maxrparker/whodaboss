const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const manager = require('./Core/manager')
const cors = require('cors')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())

app.post('/getInfo', manager.getInfo)

app.listen(port, () => {
  console.log(`Who The Boss listening on internal port ${port}`)
})
