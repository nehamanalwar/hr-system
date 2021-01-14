const fs = require('fs');

module.exports = {
    addEmployeePage: (req, res) => {
        res.render('add-employee.ejs', {
            title: 'Welcome' | 'Add a new Employee'
            ,message: ''
        });
    },
    addEmployee: (req, res) => {
        let message = '';
        let first_name = req.body.first_name;
        let middle_name = req.body.middle_name;
        let last_name = req.body.last_name;
        let birth_date = req.body.birth_date;
        let gender = req.body.gender;
        let ssn = req.body.ssn;
        let hire_date = req.body.hire_date;
        let address1 = req.body.address1;
        let address2 = req.body.address2;
        let city = req.body.city;
        let state = req.body.state;
        let zipcode = req.body.zipcode;
        let home_phone = req.body.home_phone;
        let mobile_phone = req.body.mobile_phone;
        let email = req.body.email;
        
        let employeeQuery = "SELECT * FROM `hr_system`.`employee` where first_name = '" + first_name + "' and middle_name = '" + middle_name + "' and last_name = '" + last_name + "'";

        db.query(employeeQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Employee already exists';
                res.render('add-employee.ejs', {
                    message,
                    title: 'Welcome' | 'Add a new Employee'
                });
            } else {
                
                        // send the employee's details to the database
                        let query = "INSERT INTO `hr_system`.`employee`(`ssn`,`birth_date`,`first_name`,`middle_name`,`last_name`,`gender`,`hire_date`,`address1`,`address2`,`city`,`state`,`zipcode`,`home_phone`,`mobile_phone`,`email`)VALUES('" +
                        ssn+ "','" + birth_date+ "','" +first_name+ "','" +middle_name+ "','" +last_name+ "','" +gender+ "','" +hire_date+ "','" +address1+ "','" +address2+ "','" +
                        city+ "','" +state+ "','" +zipcode+ "','" +home_phone+ "','" +mobile_phone+ "','" +email+ "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    
            }
        });
    },
    editEmployeePage: (req, res) => {
        let emp_no = req.params.id;
        let query = "SELECT * FROM `hr_system`.`employee` where emp_no = '" + emp_no + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-employee.ejs', {
                title: 'Edit  Employee'
                ,employee: result[0]
                ,message: ''
            });
        });
    },
    editEmployee: (req, res) => {
        let emp_no = req.params.id;
        let first_name = req.body.first_name;
        let middle_name = req.body.middle_name;
        let last_name = req.body.last_name;
        let birth_date = req.body.birth_date;
        let gender = req.body.gender;
        let ssn = req.body.ssn;
        let hire_date = req.body.hire_date;
        let address1 = req.body.address1;
        let address2 = req.body.address2;
        let city = req.body.city;
        let state = req.body.state;
        let zipcode = req.body.zipcode;
        let home_phone = req.body.home_phone;
        let mobile_phone = req.body.mobile_phone;
        let email = req.body.email;

        let query = "UPDATE `hr_system`.`employee` SET `ssn` = '" +ssn + "',`birth_date` = '" +
        birth_date + "',`first_name` = '" +first_name + "',`middle_name` = '" +middle_name + "',`last_name` = '" +
        last_name + "',`gender` = '" +gender + "',`hire_date` = '" +hire_date + "',`address1` = '" +
        address1 + "',`address2` = '" +address2 + "',`city` = '" +city + "',`state` = '" +state + "',`zipcode` = '" +
        zipcode + "',`home_phone` = '" +home_phone + "',`mobile_phone` = '" +mobile_phone + "',`email` = '" +
        email + "' WHERE `emp_no` = '" + emp_no + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteEmployee: (req, res) => {
        let emp_no = req.params.id;
        let deleteEmployeeQuery = 'DELETE FROM `hr_system`.`employee` WHERE emp_no = "' + emp_no + '"';
                db.query(deleteEmployeeQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    },
    viewEmployeeSalary: (req, res) => {
        let emp_no = req.params.id;


        let query = "SELECT * FROM `salary` where emp_no = '" + emp_no + "' ORDER BY from_date ASC"; // query database to get all the employees

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('view-employee-salary.ejs', {
                title: 'Welcome' | 'View Employee Salary' ,
                salaries: result,
                emp_no: emp_no
            });
        });
    },
    viewEmployeeTitle: (req, res) => {
        let emp_no = req.params.id;


        let query = "SELECT * FROM `title` where emp_no = '" + emp_no + "' ORDER BY from_date ASC"; // query database to get all the employees

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('view-employee-title.ejs', {
                title: 'Welcome' | 'View Employee Salary' ,
                titles: result,
                emp_no: emp_no
            });
        });
    }
};
