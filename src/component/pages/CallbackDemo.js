import { useCallback, useRef, useState } from "react"
import CallbackChild from "./CallbackChild"



function CallbackDemo(){

       
      const inputRef = useRef()

      const [count,setCount] = useState(0)
 
      const [name,setName] = useState('')

      const changeName = useCallback(() => {

        console.log("Function Recreated")

        setName(name === "vivek" ? "Vivek Deshpande" :  "vivek")



      },[name])

      //first iteration  current value ===> vivek     New value ===>Vivek Deshpande
      //second iteration  current value ===> Vivek Deshpande     New value ===>Vivek Deshpande
     
      const handleClick = () =>{
        console.log('inputRef =======>',inputRef)
        // inputRef.current.focus()
        inputRef.current.innerHTML = 10
      }


    return(
        <div>
            <h2>  CallbackDemo </h2>

             <h4>Count : {count} </h4>
            <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
                Increment
            </button>

            <CallbackChild name={name} changeName={changeName}/>
            <br/>
           
            <input type="text" value={name}  id="name"  className="name"  ref={inputRef}  />
 <br/>
           
         

            <br/>
            <br/>
            <button className="btn btn-primary"  onClick={handleClick}>Focus Input</button>

        </div>
    )
}

export default CallbackDemo