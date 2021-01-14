module.exports = {
    addEmployeeSalaryPage: (req, res) => {
        let query = "SELECT * FROM `hr_system`.`employee` ORDER BY emp_no ASC"; 
        
        // execute query
        db.query(query,  (err, results) => {
            if (err) {
                throw err;
            }
            res.render('add-employee-salary.ejs', {
                title: 'Welcome' | 'Employee-Salary' ,
                employees: results,
                message: ''
            });
        });
    },
    addEmployeeSalary: (req, res) => {
        let message = '';
        let salary = req.body.salary;
        let emp_no = req.body.emp_no;
        
         /*let query = "SELECT * FROM `hr_system`.`salary` where emp_no = '" + emp_no + "' ";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
           if (result.length > 0) {
                
                let query = "UPDATE `hr_system`.`salary` SET `salary` = '" + salary + "' WHERE emp_no = '" + emp_no + "' "; 
        
        // execute query
        db.query(query,  (err, results) => {
            if (err) {
                throw err;
            }
            res.render('add-employee-Salary.ejs', {
                title: 'Welcome' | 'Employee-Salary' ,
                titles: results[0],
                employees: results[1],
                message: ' Employee Salary already exists'
            });
        });
            } else { */
                
                        // send the player's details to the database
                        let query = "INSERT INTO `hr_system`.`salary`(`salary`,`emp_no`,`from_date`)VALUES('" +
                        salary+ "','" + emp_no+ "',CURDATE())";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/addEmpSalary');
                        });
                    
           // }
        //});
    }    
};