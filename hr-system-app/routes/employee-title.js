module.exports = {
    addEmployeeTitlePage: (req, res) => {
        let query = "SELECT distinct title FROM `hr_system`.`title` ORDER BY title ASC;SELECT * FROM `hr_system`.`employee` ORDER BY emp_no ASC"; 
        
        // execute query
        db.query(query, [2,1],  (err, results) => {
            if (err) {
                throw err;
            }
            res.render('add-employee-title.ejs', {
                title: 'Welcome' | 'Employee-Title' ,
                titles: results[0],
                employees: results[1],
                message: ''
            });
        });
    },
    addEmployeeTitle: (req, res) => {
        let message = '';
        let title = req.body.title;
        let emp_no = req.body.emp_no;
        
       /* let query = "SELECT * FROM `hr_system`.`title` where title = '" + title + "' and emp_no = '" + emp_no + "' ";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                
                let query = "SELECT * FROM `hr_system`.`title` ORDER BY title ASC;SELECT * FROM `hr_system`.`employee` ORDER BY emp_no ASC"; 
        
        // execute query
        db.query(query, [2,1],  (err, results) => {
            if (err) {
                throw err;
            }
            res.render('add-employee-title.ejs', {
                title: 'Welcome' | 'Employee-Title' ,
                titles: results[0],
                employees: results[1],
                message: 'Title and Employee association already exists'
            });
        });
            } else {
         */       
                        // send the player's details to the database
                        let query = "INSERT INTO `hr_system`.`title`(`title`,`emp_no`,`from_date`)VALUES('" +
                        title+ "','" + emp_no+ "',CURDATE())";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/addEmpTitle');
                        });
                    
           // }
       // });
    }    
};