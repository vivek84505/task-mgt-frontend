import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function HookDemo(){ 
    
    //Created Phase = variable declaration , Function Declaration, setting initialization
    //Mounted => API Call, setting initialization, set Initial values
    //Updated => If any depdendency value changes then useEffect runs
    //Unmounted => Cleanup unused Code like timer (Example)

    // console.log("HookDemo Component Created========>")

    const [counter,setCounter] = useState(12)

    const [counter2,setCounter2] = useState(10)
    
    const increment = () => { 
        setCounter(counter + 1);  
    };

    const decrement = () => {    
        setCounter(counter - 1); 
    };


     const increment2 = () => { 
        setCounter2(counter + 1);  
    };

    const decrement2 = () => {    
        setCounter2(counter - 1); 
    };

    //  useEffect(() => {

    //     console.log("HookDemo Component Mounted ========>")

    //     const timer = setInterval(() => {
    //         setCounter((prev) => prev + 100000);
    //          console.log("Timer Running ========>")
    //     },1000)



    //     //For Unmounting Phase Return function
    //     return () => {
    //         console.log("HookDemo Component Unmounted")
    //         clearInterval(timer)
    //         console.log("Timer Stopped")
    //     }


    // },[])


    useEffect(() => {

        // console.log("Counter 1 updated ========>")


    },[counter])


     useEffect(() => {

        // console.log("Counter 2 updated========>")


    },[counter2])
    
     

     return(
        <div>
            <div className="container">
                <h1>UseEffect Demo</h1> 

                 <h1>State Variable  - {counter}</h1>
                 <h1>State Variable - {counter2}</h1>
           
                <div className="counter-buttons">
                    <button onClick={increment}>Increment</button>
                    <button onClick={decrement}>Decrement</button> 
                </div>

                 <div className="counter-buttons">
                    <button onClick={increment2}>Increment2</button>
                    <button onClick={decrement2}>Decrement2</button> 
                </div>
             </div>
        </div>
    )
}


export default HookDemo