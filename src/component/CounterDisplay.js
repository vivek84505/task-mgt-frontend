import Counter from "./Counter";


function CounterDisplay(props){
 
  console.log("New updated value received============>",props.counter)

    return(
        <div>
            <h2 className="counter-value">Counter Display: {props.counter}</h2>
            
        </div>
    )
}

export default CounterDisplay;