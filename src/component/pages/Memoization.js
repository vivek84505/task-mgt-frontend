import { useMemo, useState } from "react"

function Memoization (){
    
    const [count,setCount] = useState(0)
    
    const [numbers,setNumbers] = useState([10,20,30,40,50,60])

    const addNumber = () => {
        setNumbers([...numbers,10])
    }
     

    const total =  useMemo(() =>{

        console.log("Calculating total..........")

        let sum = 0

        for(let i = 0; i < 1000000000; i++ ) {

        }

        numbers.forEach((num) =>{
            console.log("Num========>",num)
            sum += num
        })

        return sum
    },[numbers])
    
    
    
    return(
        <div>
            <h3>Total : {total}</h3>
            <h4>Count : {count} </h4>
            <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <br/>
            <button className="btn btn-primary mt-5" onClick={addNumber}>
                Add Number
            </button>

        </div>
    )   
}

export default Memoization