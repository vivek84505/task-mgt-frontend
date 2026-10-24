import { useState } from "react";

function UserForm() {

    // Data Binding 
    //  => One way Data binding
    //  =>  Two way Data binding
    // Controled Component
    // Form handling + Validation
  const [users,setUsers] = useState([])  

  const [formData,setFormData] = useState({
    id:"",
    name:"",
    email:"",
    mobile:""
  })   // State variable

  const [errors,setErros] = useState({}) // State variable
  const [submittedData,setSubmittedData] = useState(null)  // State variable  
  
  

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
        if(!formData.name.trim()){
            newErros.name = "Name is required"
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
        if(!formData.mobile.trim()){
            newErros.mobile = "Mobile is required"
        }
        else if(!mobileRegExp.test(formData.mobile)){
            newErros.mobile = "Invalid Mobile"
        }

        console.log("newErros after=======>",newErros)

        setErros(newErros) // Adding error data into state errors object
 

        return Object.keys(newErros).length === 0
         

  }


  const handleSubmit = (e) => {
    
     e.preventDefault();
     
     if(validateForm()){ 
       // setSubmittedData(formData)
        console.log("Form Validated Submitting data to API=======>",formData)
        formData.id = Math.floor(Math.random()  * 100) + 1
        setUsers([...users,formData])
     }
     else{
        //setSubmittedData(null)
     }
    

     
   

    // Goint to call API once the form is validated
         //console.log("Form Validated Submitting data to API=======>")
  }
 

//   console.log("formData========>",formData)
 
  return (
    <div className="container mt-4">
      <h2>User Form</h2>
 

      <form method="POST"  onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group mb-3">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.name}</small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                placeholder="Enter Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
               <small className="text-danger">{errors.mobile}</small>
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
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                     
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                 
                            </tr>
                    ))} 

                </tbody>
                </table>

        </div>
    </div>
  );
}

export default UserForm;