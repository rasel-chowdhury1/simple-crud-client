import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const data = useLoaderData();
    console.log(data);

    const handleUpdate = (event) =>{
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;

        const updateUser = {name,email};
        console.log(data._id,updateUser);
        
        fetch(`http://localhost:3000/user/${data._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount>0){
                alert("Successfully Modified")
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={data?.name} />
                <br />
                <input type="email" name="email" defaultValue={data?.email} />
                <br />
                <input type="submit" value="Update User " />
            </form>
        </div>
    );
};

export default Update;