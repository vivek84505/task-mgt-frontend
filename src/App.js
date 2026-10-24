import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Content from "./component/Content";
import Footer from "./component/Footer";
import Welcome from "./component/Welcome";
import Dashboard from "./component/pages/Dashboard";
import UseReducerDemo from "./component/pages/UseReducerDemo";
import { headerTitle, sidebarTitle,footerTitle} from "./component/title";
import { Routes,Route } from "react-router-dom"; 


import "./App.css";
import ClassComponent from "./component/ClassComponent";
import Careers from "./component/pages/Careers";
import About from "./component/pages/About";
import Reports from "./component/pages/Reports";
import Services from "./component/pages/Services";
import Counter from "./component/Counter";
import UserForm from "./component/UserForm";
import NotFound from "./component/pages/NotFound";
import UserList from "./component/pages/UserList";
import UserDetails from "./component/pages/UserDetails";
import HookDemo from "./component/pages/HookDemo";
import ContextDemo from "./component/pages/ContextDemo";
import Memoization from "./component/pages/Memoization";
import CallbackDemo from "./component/pages/CallbackDemo";
import APIGetDemo from "./component/pages/APIGetDemo";
import Employee from "./component/Employee";

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
              <Route path="/careers" element={<Careers/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/reports" element={<Reports/>}/>
              <Route path="/services" element={<Services/>}/>
              <Route path="/counter" element={<Counter/>}/>
               <Route path="/apigetdemo" element={<APIGetDemo/>}/>
              <Route path="/user" element={<UserForm/>}/>
              <Route path="/employee" element={<Employee/>}/>
              <Route path="/userlist" element={<UserList/>}/>
              <Route path="/userdetails/:id" element={<UserDetails/>}/>
              <Route path="/hookdemo" element={<HookDemo/>}/>
               <Route path="/contextdemo" element={<ContextDemo/>}/>
                <Route path="/memoization" element={<Memoization/>}/>
                <Route path="/callbackdemo" element={<CallbackDemo/>}/>
                 <Route path="/usereducerdemo" element={<UseReducerDemo/>}/>
                
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