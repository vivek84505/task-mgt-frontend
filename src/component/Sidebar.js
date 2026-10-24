import { NavLink } from "react-router-dom";

function Sidebar(props) {
  return (
    <aside className="sidebar">
      <h2>{props.title}</h2>

      <ul>
        <li>
          <NavLink to="/">
              Dashboard
          </NavLink> 
        </li>
        <li>
            <NavLink to="/employee">
              Employee CRUD
            </NavLink>
        </li>

         <li>
            <NavLink to="/careers">
              Careers
            </NavLink>
        </li>

        <li>
            <NavLink to="/about">
              About
            </NavLink>
        </li>


         <li>
            <NavLink to="/reports">
              Reports
            </NavLink>
        </li>

         <li>
            <NavLink to="/services">
              Services
            </NavLink>
        </li>

         <li>
            <NavLink to="/counter">
              Counter
            </NavLink>
        </li>

          <li>
            <NavLink to="/apigetdemo">
              API Get Demo
            </NavLink>
        </li>

         <li>
            <NavLink to="/user">
              User
            </NavLink>
        </li>
       <li>
          <NavLink to="/userlist">
            User List
          </NavLink>
       </li>

       <li>
          <NavLink to="/hookdemo">
            Hook Demo
          </NavLink>
       </li>

       <li>
          <NavLink to="/contextdemo">
            Context Demo
          </NavLink>
       </li>


  <li>
          <NavLink to="/memoization">
            Memoization Demo
          </NavLink>
       </li>


  <li>
          <NavLink to="/usereducerdemo">
            useReducerDemo
          </NavLink>
       </li>


       

  <li>
          <NavLink to="/callbackdemo">
            callback Demo
          </NavLink>
       </li>

         
      </ul>
    </aside>
  );
}

export default Sidebar;