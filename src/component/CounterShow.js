import Counter from "./Counter";
import { forwardRef, useEffect } from "react";

const CounterShow = forwardRef((props,ref) => {
 
   console.log("New updated value received in CounterShow ============>",props.counter)
 
 

  useEffect(() => {

    console.log('CounterShow component Mounted')



    return () => {
      console.log('CounterShow component Unmounted')
    };


  },[props.counter])

    return(
        <div>
            <h2 className="counter-value"> Counter from Show 1 : {props.counter}</h2>

            <input type="text" ref={ref} />
            
        </div>
    )
});

export default CounterShow;