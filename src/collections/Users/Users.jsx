import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    const loadedUsers = useLoaderData()
    const [users,setUsers] = useState(loadedUsers);
    // console.log(users)

    const handleDelete = id =>{
        console.log(id);

        fetch(`http://localhost:3000/users/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0){
                alert("Successfully deleted")
                const remaining = users.filter(user => user._id !== id);
                console.log('this is remaining list state: ',remaining);
                console.log('this is users state before set remaining state : ', users)
                setUsers(remaining);
            }
        })
    }

    console.log('Currently Users state : ', users)

    return (
        <div>
            <h3>Total users : {users.length}</h3>
            <div>
                {users.map(user => <p 
                key={user._id}>
                    Id: {user._id} Name: {user.name} Email: {user.email}
                    <Link to={`/update/${user._id}`}>
                        <button>UPdate</button>
                    </Link>
                    <button onClick={() => handleDelete(user._id)}>X</button>
                    </p>)}
            </div>
        </div>
    );
};

export default Users;