import { useEffect, useState } from "react"

function CUserList(){

   const [users,setUsers] = useState([])

    

   useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => setUsers(data))


   },[])

    console.log("Users data ======>",users)
   
    return(
        <div>
            <h2> CUserList Demo</h2>

                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>5</td>
                            </tr>
                    ))} 

                </tbody>
                </table>

        </div>
    )
}

export default CUserList