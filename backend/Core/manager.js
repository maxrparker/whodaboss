const request = require('request')

//check if same department before this us called? is your dept same as boss dept?
//Expects JSON object of employee and manager
//returns bool
function isMyBoss(employee, manager) {
  if (employee.manager == manager.full_name) {
    return true
  } else {
    return false
  }
}

//Expects JSON object of employee and Manager
//returns bool
function isSameDepartment(employee, manager) {
  if (employee.department == manager.department) {
    return true
  } else {
    return false
  }
}

//Expects string of manager full name, and array of employees
//returns bool
function isAManager(managerName, empList) {
  for (var i = 0; i < empList.length; i++) {
    if (managerName == empList[i].manager) {
      return true
    }
  }
  return false
}
//Hits Ryans' API, and gets JSON of all employees
//functions do logic and find if a boss, if same department, if my boss
exports.getInfo = function(req, res){
  //SANITIZE THESE INPUTS!!!!!
  //console.log(req.body)
  //console.log(req.body.employee)
	request("http://directory-api-dev.ynet.gov.yk.ca/employees", function(error, response, body) {
    //don't forget to error catch this
		if (!error && (response.statusCode >= 200 && response.statusCode < 300)) {
			var rawResponse = JSON.parse(body)
      var empList = rawResponse.employees
      //Initialize employee and manager as blank objects
      var employee = {}
      var manager = {}
      //console.log("count is " + rawResponse.count)
      //console.log("length is " + empList.length)
      //console.log(empList[0])
      //console.log(empList[0].username)
      //rawResponse.count should be the same as empList.length
      for (var i = 0; i < empList.length; i++) {
        if (empList[i].username == req.body.employee) {
          employee = empList[i]
        } else if (empList[i].username == req.body.manager) {
          manager = empList[i]
        }
      }
      console.log("Is my manager? " + isMyBoss(employee, manager))
      console.log("Is same department? " + isSameDepartment(employee, manager))
      console.log("Is the manager name entered a manager? " + isAManager(manager.full_name, empList))
      //console.log(employee)
      //res.send(rawResponse)
		}
    //console.log(rawResponse.employees[0])
	})
}
