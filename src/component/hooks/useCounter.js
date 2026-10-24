import { useState } from "react";


function useCounter(initialCount = 0, value){

    const [ count,setCount ] = useState(initialCount)

    const increment = () => {
        setCount(prevCount => prevCount + (value + 1))
    }

    const decrement = () => {
        setCount(prevCount => prevCount - (value + 1))
    }

    const reset = () => {
        setCount(initialCount)
    }

    return [count,increment,decrement,reset]
}

export default useCounter;