import React, { useEffect, useState } from "react";

const UsersTable = () => {
  const [users, setUsers] = useState([]); //empty 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users"); 
        if (response.ok) {
          const data = await response.json(); 
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []); 


  //delete functionality
  const handleDeleteUser = async (userEmail) => {
    try {
      const response = await fetch("http://localhost:5000/users/email", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }), 
      });
      console.log(response);
  
      if (response.ok) {
        const data = await response.json();//filtered array is returned
        alert(`User Deleted with Email: ${data.message}`)
        // console.log(data);
        setUsers(data); 
        window.location.reload();
       }// else {
      //   console.error(`Failed to delete user. Status: ${response.status}`);
      // }
    } catch (e) {
      console.error("Error Encountered:", e);
    }
  };
  


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold ml-[57.5rem] mb-6 text-gray-800">
        Users 📬
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-center">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Gender</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (    //for checking the array if empty or not 
              users.map((user) => (
                <tr key={user.email}>
                  <td className="px-4 py-2 border border-gray-300 text-center">{user.name}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">{user.gender}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                  <button onClick={() => handleDeleteUser(user.email)} className="bg-red-500 text-white px-4 py-2 rounded" >
                  Delete</button>

                 </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border border-gray-300 ml-[40rem] text-gray-500 ">
                  <span className="ml-[54rem]">No Users Found 🤖</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;


// C:\Users\HP\Register(React-Express)\Register\src\App.jsx