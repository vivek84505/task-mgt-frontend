import { useState } from "react"
import { useParams } from "react-router-dom"

function HookDemo(){

    const [counter,setCounter] = useState(12)
    var mycounter = 10;
    // state variable ==> Concept
    // useState ===> Hook

    const increment = () => {   
         mycounter = mycounter + 1
        setCounter(counter + 1);  
         
       
    };

    const decrement = () => {    
         mycounter = mycounter - 1 
        setCounter(counter - 1); 
    };

     const incrementJS = () => {   
         mycounter = mycounter + 1        
          
    };

    const decrementJS = () => {    
         mycounter = mycounter - 1 
    };
     
     
    console.log("Component Re-Rendered=======>")

     return(
        <div>
            <div className="container">

           
            <h1>State Variable - {counter}</h1>
            <h1>JS Variable - {mycounter}</h1>
            <div className="counter-buttons">
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>

                <button onClick={incrementJS}>Increment JS</button>
                <button onClick={decrementJS}>Decrement JS </button>
            </div>
             </div>
        </div>
    )
}


export default HookDemo