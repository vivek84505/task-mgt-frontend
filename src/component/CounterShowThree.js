import Counter from "./Counter";
import { useEffect } from "react";

function CounterShowThree(props){
 
    console.log("New updated value received CounterShowThree 3============>",props.counter)
 
 
// Component Mounted => componentDidMount()
// Component Update => componentDidUpdate()
  // Component Will Unmount => componentWillUnmount()
  // if your depdendency array is empty then useEffect will only run once when the component is mounted

  useEffect(() => {

    console.log('CounterShow component Mounted')



    return () => {
      console.log('CounterShow component Unmounted')
    };


  },[props.counter])

    return(
        <div>
            <h2 className="counter-value"> Counter from Show 3: {props.counter}</h2>
            
        </div>
    )
}

export default CounterShowThree;