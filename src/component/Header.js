import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; 


function Header(props) {

  const {theme,toggleTheme} = useContext(ThemeContext)
  
  //  console.log("Header Component Rendered============>")
 console.log("Header")
  return (
    <header className="header">
       
      <h1>{props.title}</h1>
      {/* <h2>Current Theme : {theme} </h2>

       <button onClick={toggleTheme} className="btn btn-danger">
        Swith Theme
        </button>  */}


    </header>
  );
}
 
export default Header;