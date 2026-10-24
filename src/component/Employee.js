import { useEffect, useState } from "react";
import api from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css"; 
import * as bootstrap from "bootstrap"

function Employee() {

    // Data Binding 
    //  => One way Data binding
    //  =>  Two way Data binding
    // Controled Component
    // Form handling + Validation
  const [employees,setEmployees] = useState([])  

  const [formData,setFormData] = useState({
    employee_code: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    date_of_joining:"", 
    salary: ""  
  })   // State variable

  const [errors,setErros] = useState({}) // State variable
  const [submittedData,setSubmittedData] = useState(null)  // State variable  
  const [editEmployeeId,setEditingEmployeeId] = useState(null)

  useEffect(()=>{
     getEmployees();
  },[])

   console.log("current editEmployeeId ========>",editEmployeeId)

  const getEmployees = async () => {

    const response = await api.get("/api/employees")
    console.log("Get API response======>",response)
    

    if(response?.data?.data?.length > 0){

         setEmployees(response?.data?.data)
    }
    else {
        alert(response.data.message)
    }
    
   

  }

  const handleChange = (e) =>{ 
    
    
    const {name,value} = e.target //1000
 
        setFormData((prevData) => (
            {...prevData,[name]:value }
        )
    )
  }
   
  const validateForm = () =>{

        let newErros = {}
        console.log("newErros before=======>",newErros)
        // To decide if an array or object is emtpy or not we use lenght. if length is 0 then array/object is empty. 


        // validatiing form elements using formdaData
        if(!formData.employee_code.trim()){
            newErros.employee_code = "employee code is required"
        }


        if(!formData.first_name.trim()){
        newErros.first_name = "first_name code is required"
        }

        if(!formData.last_name.trim()){
        newErros.last_name = "last_name code is required"
        }

        if(!formData.designation.trim()){
        newErros.designation = "designation code is required"
        }

        
        if(!formData.department.trim()){
        newErros.department = "department code is required"
        }

        if(!formData.salary.trim()){
        newErros.salary = "salary code is required"
        }





        // here we are checking if value is blank or not + we need to check if the value is valid Email or not
        let emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        
        if(!formData.email.trim()){
            newErros.email = "Email is required"
        }
        else if(!emailRegExp.test(formData.email)){
             newErros.email = "Invalid Email"
        }


         // here we are checking if value is blank or not + we need to check if the value is valid Mobile or not
        //let mobileRegExp = ^[789]\d{9}$

        let mobileRegExp = /^(\+91|\+91\-|0)?[789]\d{9}$/
        if(!formData.phone.trim()){
            newErros.phone = "Mobile is required"
        }
        else if(!mobileRegExp.test(formData.phone)){
            newErros.phone = "Invalid phone"
        }

        console.log("newErros after=======>",newErros)

        setErros(newErros) // Adding error data into state errors object
 

        return Object.keys(newErros).length === 0
         

  }


  const handleSubmit = async (e) => {
    
     e.preventDefault();
     
     if(validateForm()){ 
       // setSubmittedData(formData)
        console.log("Employee submitted formdata=======>",formData) 
          
          const response = await api.post("/api/employees",formData)
          
          console.log("Add Employee API Response =======>",response) 

          if( response?.data?.status === "sucessfull" ){
              alert('Employee Added sucessfully')     
              getEmployees()    
          }  
          else if( response?.data?.status === "fail" ){
             alert('Something went wrong!')
          }

        // setEmployees([...employees,formData])


        
     }
     else{
        //setSubmittedData(null)
     }
    

      
  }
 
  const handleUpdate = async (e) => {

    e.preventDefault();

    if(!validateForm()){
        alert("Something went wrong")
    }
    

    try {

        console.log("Update Employee Data", formData)

        const response = await api.put(`/api/employees/${editEmployeeId}`,formData);
       
        console.log("Put API Response",response)

        if(response?.data?.status === "sucessfull"){
            alert("Employee Updated Sucesfully")
             getEmployees()

            const modelElement = document.getElementById("editEmployeeModal")
            const modal = bootstrap.Modal.getInstance(modelElement)
            if(modal){
                modal.hide()
            }

        }
        else{

        }

    }
    catch(error){
        alert("Something went wrong!")
    }


    
  }

  const handleEdit = (employee) => {
    console.log("Employee to Edit:",employee)

    setEditingEmployeeId(employee.employee_id)

    setFormData({
      employee_code: employee.employee_code || "",
      first_name: employee.first_name || "",
      last_name: employee.last_name || "",
      email: employee.email || "",
      phone: employee.phone || "",
      designation: employee.designation || "",
      department:  employee.department || "",
      date_of_joining: employee.date_of_joining || "",
      salary: employee.salary || "",
    })   // State variable

    setErros({})

    const modelElement = document.getElementById("editEmployeeModal")
    const modal = new bootstrap.Modal(modelElement)
    modal.show();

  }


  const handleDelete = async (employee) => {
    console.log("Employee to Delete:",employee)

   let  c = window.confirm("Are you sure you want to delete this record ?")

    if(c){

        const {employee_id}  = employee;
 
         const response = await api.delete(`/api/employees/${employee_id}`)
         
         if(response.data.status == "sucessfull" ){
            alert(response.data.message)
             getEmployees();
         }
         else{
            alert(response.data.message)
         }
    }
    

     
 

  }

//   console.log("formData========>",formData)
 
  return (
    <div className="container mt-4">
      <h2>Employee Form</h2>
 

      <form method="POST"  onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group mb-3">
              <label htmlFor="name">Employee Name</label>
              <input
                type="text"
                className="form-control"
                id="employee_code"
                
                name="employee_code"
                placeholder="Employee code"
                value={formData.employee_code}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.employee_code}</small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group mb-3">
              <label htmlFor="first_name">first name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                placeholder="Enter Email"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
               <small className="text-danger">{errors.first_name}</small>
            </div>
          </div>


          <div className="col-md-4">
            <div className="form-group mb-3">
              <label htmlFor="last_name">Last name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Enter Email"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
               <small className="text-danger">{errors.last_name}</small>
            </div>
          </div>

           <div className="col-md-4">
            <div className="form-group mb-3">
              <label htmlFor="email">email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
               <small className="text-danger">{errors.email}</small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter Mobile Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
               <small className="text-danger">{errors.phone}</small>
            </div>
          </div>

        <div className="col-md-4">
            <div className="form-group mb-3">
              <label htmlFor="designation">designation</label>
              <input
                type="text"
                className="form-control"
                id="designation"
                placeholder="Enter designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
               <small className="text-danger">{errors.designation}</small>
            </div>

            </div>
        
 <div className="col-md-4">
             <div className="form-group mb-3">
              <label htmlFor="department">department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                placeholder="Enter department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
               <small className="text-danger">{errors.department}</small>
            </div>
</div>


 <div className="col-md-4">
             <div className="form-group mb-3">
              <label htmlFor="salary">salary</label>
              <input
                type="text"
                className="form-control"
                id="salary"
                placeholder="Enter salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
               <small className="text-danger">{errors.salary}</small>
            </div>
          </div>

          
 <div className="col-md-4">
             <div className="form-group mb-3">
              <label htmlFor="salary">date_of_joining</label>
              <input
                type="date"
                className="form-control"
                id="date_of_joining"
                placeholder="Enter date_of_joining"
                name="date_of_joining"
                value={formData.date_of_joining}
                onChange={handleChange}
              />
               <small className="text-danger">{errors.date_of_joining}</small>
            </div>
          </div>



        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </form>

        {submittedData && (
             <div className="card mt-4 p-3">
                <h4>Submitted Data</h4>
                <p>
                    <strong>Name:</strong> {submittedData.name}
                </p>
                <p>
                    <strong>Email:</strong> {submittedData.email}
                </p>

                <p>
                    <strong>Mobile:</strong> {submittedData.mobile}
                </p>
            </div>
        )}

        {/* user table */}
        <div>
          <h2> CUserList Demo</h2>

              <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Employee id</th>
                    <th scope="col">Employee code</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Department</th>
                    <th scope="col">Action</th>
                     
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee)=>(
                            <tr key={employee.employee_id}>
                                <th scope="row">{employee.employee_id}</th>
                                <td>{employee.employee_code}</td>
                                <td>{employee.first_name} {employee.last_name}</td>
                                <td>{employee.email}</td>
                                 <td>{employee.phone}</td>
                                   <td>{employee.designation}</td>
                                    <td>{employee.department}</td>
                                    <td><button onClick={() => handleEdit(employee)} className="btn btn-primary">Edit</button>
                                    <button onClick={() => handleDelete(employee)} className="btn btn-danger">Delete</button>
                                    </td>
                                    
                            </tr>
                    ))} 

                </tbody>
                </table>


                {/* Employee Edit Modal Start */}
                
                
{/* Edit Employee Modal */}

<div
    className="modal fade"
    id="editEmployeeModal"
    tabIndex="-1"
    aria-labelledby="editEmployeeModalLabel"
    aria-hidden="true"
>
    <div className="modal-dialog modal-lg">
        <div className="modal-content">

            <div className="modal-header">
                <h5
                    className="modal-title"
                    id="editEmployeeModalLabel"
                >
                    Edit Employee
                </h5>

                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>

            <div className="modal-body">

                <form  method="POST"  onSubmit={handleUpdate}>

                    <div className="row">

                        {/* Employee Code */}

                        <div className="col-md-6">
                            <div className="mb-3">

                                <label className="form-label">
                                    Employee Code
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="employee_code"
                                    value={formData.employee_code}
                                    onChange={handleChange}
                                />

                                <small className="text-danger">
                                    {errors.employee_code}
                                </small>

                            </div>
                        </div>


                        {/* First Name */}

                        <div className="col-md-6">
                            <div className="mb-3">

                                <label className="form-label">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />

                                <small className="text-danger">
                                    {errors.first_name}
                                </small>

                            </div>
                        </div>


                        {/* Last Name */}

                        <div className="col-md-6">
                            <div className="mb-3">

                                <label className="form-label">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />

                                <small className="text-danger">
                                    {errors.last_name}
                                </small>

                            </div>
                        </div>


                        {/* Email */}

                        <div className="col-md-6">
                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <small className="text-danger">
                                    {errors.email}
                                </small>

                            </div>
                        </div>


                        {/* Phone */}

                        <div className="col-md-6">
                            <div className="mb-3">

                                <label className="form-label">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                                <small className="text-danger">
                                    {errors.phone}
                                </small>

                            </div>
                        </div>


                        {/* Designation */}

                        <div className="col-md-6">
                            <div className="mb-3">

                                <label className="form-label">
                                    Designation
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                />

                                <small className="text-danger">
                                    {errors.designation}
                                </small>

                            </div>
                        </div>


                        {/* Department */}

                        <div className="col-md-6">
                            <div className="mb-3">

                                <label className="form-label">
                                    Department
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                />

                                <small className="text-danger">
                                    {errors.department}
                                </small>

                            </div>
                        </div>


                        {/* Salary */}

                        <div className="col-md-6">
                            <div className="mb-3">

                                <label className="form-label">
                                    Salary
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                />

                                <small className="text-danger">
                                    {errors.salary}
                                </small>

                            </div>
                        </div>


                        {/* Date of Joining */}

                        <div className="col-md-6">
                            <div className="mb-3">

                                <label className="form-label">
                                    Date of Joining
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="date_of_joining"
                                    value={formData.date_of_joining}
                                    onChange={handleChange}
                                />

                                <small className="text-danger">
                                    {errors.date_of_joining}
                                </small>

                            </div>
                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Update Employee
                        </button>

                    </div>

                </form>

            </div>

        </div>
    </div>
</div>

                {/* Employee Edit Modal End */}

        </div>
    </div>
  );
}

export default Employee;