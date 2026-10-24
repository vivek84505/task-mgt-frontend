import { useState,useEffect } from "react"
import { NavLink } from "react-router-dom"

function UserList(){

    // https://jsonplaceholder.typicode.com/users
    // https://jsonplaceholder.typicode.com/todos
    // https://jsonplaceholder.typicode.com/comments
    // https://jsonplaceholder.typicode.com/posts

    const [users,setUsers] = useState([])

    useEffect(() => {
            console.log("HookDemo Component Mounted ========>")
            fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))

    },[])

    
    return(
        <div>
            <h2>User List</h2>

            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Website</th>
                    <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody>
                       {users.map((user) => (
                        <tr key={user.id}>
                            <td scope="row">{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.website}</td>
                            <td><NavLink to={"/userdetails/"+user.id}  >Details</NavLink></td>
 
                        </tr>

                       ) )} 
                </tbody>
                </table>
        </div>
    )
}

 
export default UserList