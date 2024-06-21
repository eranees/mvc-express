var sql = require('../db');

var employeeModel = function () { }

employeeModel.insertEmployee = function (newEmployee, result) {
    sql.query("INSERT into employee SET  ?", newEmployee, function (err, res, field) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, res);
        }
    });

}
employeeModel.getAllEmployees = function (result) {
    sql.query("SELECT * FROM  `employee`", function (err, rows, fields) {
        if (err) {
            return result(err, null);
        } else {
            return result(null, rows);
        }
    });
}
employeeModel.getEmployeeById = function (employee_id, result) {
    sql.query("SELECT employee.*,company.name as company_name FROM employee  LEFT JOIN company ON company.id=employee.company_id WHERE employee.id=" + employee_id, function (err, rows) {
        if (err)
            return result(err);

        if (rows.length <= 0) {
            return result(err);
        }
        else {
            return result(rows);
        }
    });
}


employeeModel.deleteEmployeeById = function (employee_id, result) {
    // Use parameterized query to prevent SQL injection
    sql.query("DELETE FROM employee WHERE employee.id = ?", [employee_id], function (err, rows) {
        if (err) {
            console.error("Error deleting employee:", err);
            return result(err);
        }

        // Check if any rows were affected (rows.affectedRows should typically be checked)
        if (rows.affectedRows === 0) {
            // No rows deleted, might indicate the employee_id wasn't found
            return result({ message: 'Employee not found' });
        } else {
            // Successful deletion, return success
            return result(null, { message: 'Employee deleted successfully' });
        }
    });
};

module.exports = employeeModel;