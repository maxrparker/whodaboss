const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const request = require('request')
const port = 3000

const cors = require('cors')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())

app.get('/', function (req, res) {
    //res.send('The API Service is running');
    request("http://directory-api-dev.ynet.gov.yk.ca/employees", function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
    }
	})
})

app.listen(port, () => {
  console.log(`Who The Boss listening on internal port ${port}`)
})