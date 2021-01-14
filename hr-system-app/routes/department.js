module.exports = {
    viewDepartmentsPage: (req, res) => {
        let query = "SELECT * FROM `hr_system`.`department` ORDER BY dept_no ASC"; // query database to get all the employees

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/viewDept');
            }
            res.render('department.ejs', {
                title: 'Welcome' | 'View Departments' ,
                departments: result
            });
        });
    },
    addDepartmentPage: (req, res) => {
        res.render('add-department.ejs', {
            title: 'Welcome' | 'Add a new Department'
            ,message: ''
        });
    },
    addDepartment: (req, res) => {
        let message = '';
        let dept_name = req.body.dept_name;
        
        let departmentQuery = "SELECT * FROM `hr_system`.`department` where dept_name = '" + dept_name + "'";

        db.query(departmentQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Department already exists';
                res.render('add-department.ejs', {
                    message,
                    title: 'Welcome' | 'Add a new Department'
                });
            } else {
                
                        // send the player's details to the database
                        let query = "INSERT INTO `hr_system`.`department`(`dept_name`)VALUES('" +dept_name+ "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/viewDept');
                        });
                    
            }
        });
    },
    editDepartmentPage: (req, res) => {
        let dept_no = req.params.id;
        let query = "SELECT * FROM `hr_system`.`department` where dept_no = '" + dept_no + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-department.ejs', {
                title: 'Edit  Department'
                ,department: result[0]
                ,message: ''
            });
        });
    },
    editDepartment: (req, res) => {
        let dept_no = req.params.id;
        let dept_name = req.body.dept_name;
        
        let query = "UPDATE `hr_system`.`department` SET `dept_name` = '" + dept_name + "' WHERE `dept_no` = '" + dept_no + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/viewDept');
        });
    },
    deleteDepartment: (req, res) => {
        let dept_no = req.params.id;
        let query = 'DELETE FROM `hr_system`.`department` WHERE dept_no = "' + dept_no + '"';
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/viewDept');
                });
    }
};