const mongoose= require( 'mongoose');
// ----------------------
// User Schema & Model
// ----------------------
const EmployeeSchema = new mongoose.Schema({
    name:  String, 
    email:  String,
    password:  String
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel