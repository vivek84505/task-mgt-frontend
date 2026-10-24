import React from "react"

function CallbackChild({name,changeName}){

    console.log("Child Component Re-Rendered")

    return(
        <div>
             <h3>Name : {name}</h3>

             <button className="btn btn-warning" onClick={changeName}>Change Name</button>
        </div>
    )
}

export default React.memo(CallbackChild)