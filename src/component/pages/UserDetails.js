
import { useEffect, useState } from "react";
import { useParams,Link  } from "react-router-dom";

function UserDetails(){

    const {id} = useParams()
    
    const [user,setUser] = useState(null) 
    //Purpose
    //Syntax
    //Usage

    useEffect(() => {

            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => response.json())
            .then((data) => setUser(data))


    },[id])


    return(
         
        <div className="container mt-4">
             
            <h2>User Details</h2>
        {user && (
            <table className="table table-bordered">

                <tbody>
 
                     <tr>

                        <th>ID</th>

                        <td>{user?.id}</td>

                    </tr>

                    <tr>

                        <th>Name</th>

                        <td>{user?.name}</td>

                    </tr>

                    <tr>

                        <th>Username</th>

                        <td>{user?.username}</td>

                    </tr>

                    <tr>

                        <th>Email</th>

                        <td>{user?.email}</td>

                    </tr>

                    <tr>

                        <th>Phone</th>

                        <td>{user?.phone}</td>

                    </tr>

                    <tr>

                        <th>Website</th>

                        <td>{user?.website}</td>

                    </tr>

                    <tr>

                        <th>City</th>

                        <td>{user?.address?.city}</td>

                    </tr>

                    <tr>

                        <th>Company</th>

                        <td>{user?.company?.name}</td>

                    </tr>

                </tbody>

            </table>
         )} 
            

            <Link
                to="/"
                className="btn btn-secondary"
            >
                Back to Users
            </Link>

        </div>
    )
}

export default UserDetails;