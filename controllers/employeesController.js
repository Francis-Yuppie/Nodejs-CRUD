const { parse } = require('date-fns');

/** uncomment if using json files as your database */
// const data = {
//     employees: require('../model/employees.json'),
//     setEmployees: function (data) { this.employees = data }
// };

const Employee = require("../model/Employee");

const getAllemployes = async (req, res) => {
    // res.json(data.employees); /**for json files as db */

    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(employees);
};

const createNewEmployee = async (req, res) => {

    /** uncomment the code if using json files as your db */

    // const newEmployee = {
    //     id: data.employees[data.employees.length - 1].id + 1 || 1,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname
    // }

    // if (!newEmployee.firstname || !newEmployee.lastname) {
    //     return res.status(400).json({ "message": "First and Last naes are required" });
    // }

    /**mongo db  */
    if (!req.body.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and Last Names are required.' });

    }
    /** uncomment if using json files as db */

    // data.setEmployees([...data.employees, newEmployee]);
    // res.status(201).json(data.employees);

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
    }
};

const updateEmployee = async (req, res) => {
    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID parameter is required.'});
    }

    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if (!employee) {
        return res.status(204).json({ "message": `NO Matches ID ${req.body.id}` });
    }

    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.firstname = req.body.lastname;

    /** for json files as db */
    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // const unsortedArray = [...filteredArray, employee];
    // data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    /** mongo db  */
    const result = await employee.save();
    // res.json(data.employees); /** for json files as db  */
    res.json(result);
    

};

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({'message': 'Employee ID required'});

    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id)); /**for json */

    const employee = await Employee.findOne({_id: req.body.id}).exec();

    if (!employee) {
        return res.status(204).json({ "message": `NO Matches ID ${req.body.id}` });
    }
 /** uncomment the code if using json files as db */
    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // data.setEmployees(...filteredArray);

    /**mongo db */
    const result = await employee.deleteOne({_id: req.body.id});
    // res.json(data.employees); /** for json files */
    res.json(result);

};

const getEmployee = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'Employee ID required'});

    // const employee = data.employees.find(emp => emp.id === parseInt(req.params.id)); /** for json as db */
    const employee =  await Employee.findOne({_id: req.params.id}).exec();

    if (!employee) {
        return res.status(204).json({ "message": `NO Matches ID ${req.params.id}` });
    }
    res.json(employee);
};

module.exports = {
    getAllemployes,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}