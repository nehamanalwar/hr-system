module.exports = {
    addDeptEmployeePage: (req, res) => {
        let query = "SELECT * FROM `hr_system`.`department` ORDER BY dept_no ASC;SELECT * FROM `hr_system`.`employee` ORDER BY emp_no ASC"; 
        
        // execute query
        db.query(query, [2,1],  (err, results) => {
            if (err) {
                throw err;
            }
            res.render('add-dept-employee.ejs', {
                title: 'Welcome' | 'Department-Employee' ,
                departments: results[0],
                employees: results[1],
                message: ''
            });
        });
    },
    associateDepartmentAndEmployee: (req, res) => {
        let message = '';
        let dept_no = req.body.dept_no;
        let emp_no = req.body.emp_no;
        
        let query = "SELECT * FROM `hr_system`.`dept_emp` where dept_no = '" + dept_no + "' and emp_no = '" + emp_no + "' ";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                
                let query = "SELECT * FROM `hr_system`.`department` ORDER BY dept_no ASC;SELECT * FROM `hr_system`.`employee` ORDER BY emp_no ASC"; 
        
        // execute query
        db.query(query, [2,1],  (err, results) => {
            if (err) {
                throw err;
            }
            res.render('add-dept-employee.ejs', {
                title: 'Welcome' | 'Department-Employee' ,
                departments: results[0],
                employees: results[1],
                message: 'Department and Employee association already exists'
            });
        });
            } else {
                
                        // send the player's details to the database
                        let query = "INSERT INTO `hr_system`.`dept_emp`(`dept_no`,`emp_no`,`from_date`)VALUES('" +
                        dept_no+ "','" + emp_no+ "',CURDATE())";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/addDeptEmp');
                        });
                    
            }
        });
    } ,
    viewDeptEmployees: (req, res) => {
        let dept_no = req.params.id;
        let query = "SELECT emp.emp_no as emp_no, emp.first_name as first_name, emp.middle_name as middle_name, emp.last_name as last_name, emp.email as email FROM hr_system.employee emp, hr_system.dept_emp de where de.emp_no = emp.emp_no and dept_no = " + dept_no+ " ORDER BY emp.emp_no ASC"; 

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/viewDept');
            }
            res.render('view-dept-employees.ejs', {
                title: 'Welcome' | 'View Department Employees' ,
                employees: result,
                dept_no: dept_no
            });
        });
    },
    deleteEmployeeFromDepartment :  (req, res) => {
        let emp_no = req.params.id;
        let dept_no = req.params.dept_no;
        let query = 'DELETE FROM `hr_system`.`dept_emp` WHERE emp_no = "' + emp_no + '"';
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/viewDeptEmployees/'+dept_no);
                });
    }
};