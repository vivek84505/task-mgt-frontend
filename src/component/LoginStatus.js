import { useState } from "react"


function LoginStatus(){

    const [isLoggeIn,setIsLoggedIn] = useState(false)

    const handleLogin = () => {

         setIsLoggedIn(!isLoggeIn)

        // if (isLoggeIn === true){
        //     setIsLoggedIn(false)
        // }
        // else if (isLoggeIn === false){
        //     setIsLoggedIn(true)
        // }
    }
     
    // function handleClick(e) {  
    //     e.preventDefault();  
    //     alert('You had clicked a Link.');  
    // }  

    return(
        <div>
              {isLoggeIn ? (<h2>Welcome Vivek...</h2>) : (<h2>Please Login...</h2>)}

             {isLoggeIn ? (<button onClick={handleLogin} className="btn btn-danger">Logout</button> ) :
             (<button onClick={handleLogin} className="btn btn-primary">Login</button>)}

           
           {/* <a href="https://www.google.com/" onClick={handleClick}>  
              Click_Me  
            </a>   */}
            
             
        </div>
    )

}

export default LoginStatus