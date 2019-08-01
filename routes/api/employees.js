const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const employees = require('../../Employees');


//get all employees
router.get('/', (req, res) => {
  res.json(employees);
});

//get single employee by id
router.get('/:id', (req, res) => {
  const found = employees.some(employee => employee.id === paresInt(req.params.id));
  if (found) {
    res.json(employees.filter(employee => employee.id === parseInt(req.params.id)));
  }else {
     res.status(400).json({msg: 'Employee not found'});
  }
});

//add employee
router.post('/', (req, res) => {
  const newEmployee = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    position: req.body.position
  }

  if (!newEmployee.name || !newEmployee.email || !newEmployee.position) {
    return res.status(400).json({msg:'Include all fields'});
  }
  employees.push(newEmployee);
  res.json(employees);
});

//update employee
router.put('/:id', (req, res) => {
  const found = employees.some(employee => employee.id === paresInt(req.params.id));
  if (found) {
    const updateEmployee = req.body;
    employees.forEach(employee =>{
      if(employee.id === parseInt(req.params.id)){
        employee.name = updateEmployee.name ? updateEmployee.name : employee.name;
        employee.email = updateEmployee.email ? updateEmployee.email : employee.email;
        employee.position = updateEmployee.position ? updateEmployee.position : employee.postion;

        res.json({msg: 'Employee updated'});
      }
    });
  }else {
     res.status(400).json({msg: 'Employee not found'});
  }
});

//delete employee by id
router.delete('/:id', (req, res) => {
  const found = employees.some(employee => employee.id === paresInt(req.params.id));
  if (found) {
    res.json({msg:'Employee Deleted', employees:employees.filter(employee => employee.id !== parseInt(req.params.id))});
  }else {
     res.status(400).json({msg: 'Employee not found'});
  }
});
module.exports = router;
