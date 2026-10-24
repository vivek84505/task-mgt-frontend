import { useEffect, useRef, useState } from "react";
import CounterShow from "./CounterShow";
import CounterShowTwo from "./CounterShowTwo";
import CounterShowThree from "./CounterShowThree";
import CounterAction from "./CounterAction";
import CounterDisplay from "./CounterDisplay";
import Header from "./Header";


function Counter() {
 
  const [mycounter, setCount] = useState(0);

  const inputRef = useRef() 
  
  const increment = (value) => {     
    setCount(mycounter + value);   
  };

  const decrement = (value) => { 
    setCount(mycounter - value);
  };

  const handleClick = () => {
     
  if (inputRef.current) {
      inputRef.current.focus(); 
    }
  }
 
  
  return (
    <div className="counter-container">
      <CounterShow counter={mycounter} ref={inputRef} />     
       <CounterShowTwo counter={mycounter} />     
        <CounterShowThree counter={mycounter} />     
        <button onClick={handleClick}>Focus Child Input</button>
      <CounterAction  incrementCounter={increment} decrementCounter={decrement} />
      {(mycounter >= 18) ? (<h2>Adult</h2>) : (<h2>TeenAger</h2>)}
      { mycounter % 2 === 0 ? (<h2>Even</h2>) : (<h2>Odd</h2>) }
     
       {/* state */}
       {/* props */}
      
    </div>
  );
}

export default Counter;