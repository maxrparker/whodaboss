const request = require('request')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//returns bool
function myBoss() {
	// app.get("/getInfo", function(req, res) {
	// 	var employee = res.body
	// 	console.log(employee)
	// })
	//var employee = req.query.employee;
	console.log("Hits function myBoss")
}
//Hits Ryans' API, and gets JSON of all employees
//functions do logic and find if a boss, if same department, if my boss
exports.getInfo = function(req, res){
	request("http://directory-api-dev.ynet.gov.yk.ca/employees", function(error, response, body) {
		if (!error && (response.statusCode >= 200 && response.statusCode < 300)) {
			rawResponse = body
		}
	})
	myBoss()
}