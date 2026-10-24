
import useCounter from "../hooks/useCounter"

function Careers(){

    const [count,increment,decrement,reset] = useCounter(0,4)
    
 
    return(
        <div>    

             <div className="counter-container">        
            
                <h2 className="counter-value"> Counter from Careers Page : {count}</h2>

                <div className="counter-buttons">
                    <button onClick={increment}>Increment</button>
                    <button onClick={decrement}>Decrement</button>
                    <button onClick={reset}>Reset</button>

                </div>
            </div>
            
            

        </div>
    )
}

export default Careers