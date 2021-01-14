const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

 const {getHomePage} = require('./routes/index');
 const {addEmployeePage, addEmployee, deleteEmployee, editEmployee, editEmployeePage, viewEmployeeSalary, viewEmployeeTitle} = require('./routes/employee');
 const {viewDepartmentsPage, editDepartmentPage, deleteDepartment, addDepartment, addDepartmentPage, editDepartment} = require('./routes/department');
 const {viewDeptEmployees, addDeptEmployeePage, associateDepartmentAndEmployee, deleteEmployeeFromDepartment} = require('./routes/dept-employee');
 const {addEmployeeTitlePage, addEmployeeTitle} = require('./routes/employee-title');
 const {addEmployeeSalaryPage, addEmployeeSalary} = require('./routes/employee-salary');
 const port = 5000;

// create connection to database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'NehaMU',
    database: 'hr_system',
    multipleStatements: true
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app

app.get('/', getHomePage);
app.get('/add', addEmployeePage);
app.get('/edit/:id', editEmployeePage);
app.get('/delete/:id', deleteEmployee);
app.post('/add', addEmployee);
app.post('/edit/:id', editEmployee);
app.get('/viewSalary/:id', viewEmployeeSalary);
app.get('/viewTitle/:id', viewEmployeeTitle);

app.get('/viewDept', viewDepartmentsPage);
app.get('/editDept/:id', editDepartmentPage);
app.get('/deleteDept/:id', deleteDepartment);
app.get('/addDept', addDepartmentPage);
app.post('/addDept', addDepartment);
app.post('/editDept/:id', editDepartment);
app.get('/viewDeptEmployees/:id', viewDeptEmployees);
app.get('/deleteFromDept/:id/:dept_no', deleteEmployeeFromDepartment);

app.get('/addDeptEmp', addDeptEmployeePage);
app.post('/addDeptEmp', associateDepartmentAndEmployee); 


app.get('/addEmpTitle', addEmployeeTitlePage);
app.post('/addEmpTitle', addEmployeeTitle); 

app.get('/addEmpSalary', addEmployeeSalaryPage);
app.post('/addEmpSalary', addEmployeeSalary); 



// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});