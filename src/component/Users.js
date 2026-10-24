import { useState, useEffect } from "react";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUsers(data));

  }, []);

  return (
    <>
      {
        users.map(user => (
          <p key={user.id}>
            {user.id}{user.name}
          </p>
        ))
      }
    </>
  );

}

export default Users;