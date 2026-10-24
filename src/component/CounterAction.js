function CounterAction(props){

    return(
        <div>
            {/* <h2 className="counter-value">Counter From Action: {props.counter}</h2> */}
            <div className="counter-buttons">
                <button onClick={()=>{props.incrementCounter(1)}}>Increment</button>
                <button onClick={() => {props.decrementCounter(1)}}>Decrement</button>
            </div>
        </div>
    )
}

export default CounterAction;