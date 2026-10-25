import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Footer from "./component/Footer";
 
import Dashboard from "./component/pages/Dashboard";

import { headerTitle, sidebarTitle,footerTitle} from "./component/title";
import { Routes,Route } from "react-router-dom"; 

import UsersManagement from "./component/users/UsersManagement";
import TaskManagement from "./component/task/TaskManagement";


import "./App.css"; 
import NotFound from "./component/pages/NotFound"; 
import Employee from "./component/Employee";
import TaskKanban from "./component/task/TaskKanban";

function App() {

  
  return (
    <div className="app">
      
      <Header title={headerTitle} />
  
         <div className="main-layout">

        <Sidebar title={sidebarTitle} />

        {/* Old Content Code */}
        
        {/* <Content/> */}
         
       
         


        <div className="content">
          <Routes>
              <Route path="/" element={<Dashboard/>}/>             
              <Route path="/employee" element={<Employee/>}/>
              <Route path="/users" element={<UsersManagement/>}/>
              <Route path="/tasks" element={<TaskManagement/>} />  
              <Route path="/kanban" element={<TaskKanban/>}/>
              <Route path= "*" element={<h1>404 Page Not Found</h1>}/>
              <Route component={NotFound} />  

          </Routes>
        </div>

      </div>

      <Footer  title={footerTitle} />
    </div>
  );
}

export default App;