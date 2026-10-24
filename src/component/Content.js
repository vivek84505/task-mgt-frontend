import { useState } from "react";
import StudentDetails from "./StudentDetails";
import Counter from "./Counter";
import MyParagraph from "./MyParagraph";
import Users from "./Users";
import UserForm from "./UserForm";
import LoginStatus from "./LoginStatus";
import Emodel from "./EModel";
import CDatalist from "./CDatalist";
import CUserList from "./CUserList";
 
// React component needs data for dynamic contents
// Declared Data
// state
    
    // State data can change over time he change in state over time can happen as a response to user action or system event. 

    // It is the heart of the react component which determines the behavior of the component and how it will render. 
 
    //They are also responsible for making a component dynamic and interactive.

    // Both Declared and state data can be sent as prop to other component.

function Content() {

   
  const [flag,setFlag] = useState(false) // true OR false
  const [myname , setMyName] = useState('')



  const toggleFlag = () => {
    setFlag(!flag)
  }
  
  const setnameValue = (event) => {
    console.log("setnameValue called============>")
    setMyName(event.target.value)
  }
  

 // const count = 0

  // let student_one = {
  //   name:'Vivek deshpande',
  //   id:'123',
  //   age:'35',
  //   course:'AI Full stack',
  //   class:'AI Bootcamp'
  // }   

  //  let student_two = {
  //   name:'Golu',
  //   id:'999',
  //   age:'25',
  //   course:'Full stack Master Course',
  //   class:'Full stack Bootcamp'
  // } 

  // let student_three = {
  //   name:'Nanu',
  //   id:'12122',
  //   age:'29',
  //   course:'MBA',
  //   class:'MBA MARKETING'
  // } 

  // var number = 10


  
  //product search
  //ORDER

  // order place
  // payment  
  // order ship
  // order dispatch
  // out for delivery
  // delivered


  let students = [
    {
      name:'Vivek',
      age:35
    },
    {
      name:'ajay',
      age:16
    },
    {
      name:'vijay',
      age:18
    },
    {
      name:'Rajesh',
      age:30
    },
    {
      name:'kunal',
      age:22
    },
    {
      name:'shivay',
      age:2
    },
    {
      name:'Abhishek',
      age:12
    }
  ]

 


  console.log("Component Re-Rendered")

  return (
    <main className="content">
      <h2>Welcome to React</h2>

      

      <div className="card"> 
        
        <UserForm/>

        {/* <StudentDetails details={student_one} /> */}
       {/* <Counter/>  */}
       {/* <CDatalist/> */}
      {/* <CUserList/> */}
      {/* <LoginStatus/> */}
      {/* <Emodel/> */}

      {/* if(age >= 18){
        console.log("You are not a teen ager")
      } 
      else{
        console.log("You are a teen ager")
      }
      
      {(age >= 18) ? "not a teen ager" : "teen ager"} */}

      {/* { 
         flag ? <MyParagraph/> : ''
      } */}
       
        
        {/* <button onClick={toggleFlag}>Show Text</button> */}

       

      </div>
      
      {/* { 
         flag ? <Counter/> : ''
      } */}
    {/* <Users/> */}

        {/* <h2>My Name = {myname } </h2>
       <input type="text" name="myname" value={myname} onChange={setnameValue}/> */}

      {/* <button onClick={setnameValue}>Change name</button> */}
       {/* <div>
          {
            students.map((student) =>  
              (
              <li>
                <ul>Name - {student.name}</ul>
                <ul>Age - { (student.age <= 18) ? (<p> Teenager</p>) : (<p>Adult</p>) }</ul>
              </li>
              )
            )
          }
           

        </div> */}
    </main>
  );
}

export default Content;