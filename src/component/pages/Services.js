import useCounter from "../hooks/useCounter"

function Services(){

    const [count,increment,decrement,reset] = useCounter(0,2)

    return(
        <div>
            <h2> Services Component</h2>

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

export default Services