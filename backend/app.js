const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const manager = require('./Core/manager')

const cors = require('cors')


// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

app.use(cors())
app.use(express.static('components'))

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// app.get('/', function (req, res) {
//     //res.send('The API Service is running');
//     request("http://directory-api-dev.ynet.gov.yk.ca/employees", function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body)
//     }
// 	})
// })

app.post('/getInfo', manager.getInfo)

app.listen(port, () => {
  console.log(`Who The Boss listening on internal port ${port}`)
})
