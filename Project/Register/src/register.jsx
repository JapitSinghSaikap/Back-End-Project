import React, { useEffect, useState } from "react";

const UsersTable = () => {
  const [users, setUsers] = useState([]); //empty
  const [selectedUser, setSelectedUser] = useState(null); 

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


  const closeModal = () => setSelectedUser(null);//selected user ko null krne ke liye taki wo hidden hojaye
  


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Users 📬
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-center">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Email</th>
              {/* <th className="px-4 py-2 border border-gray-300 text-center">Gender</th> */}
              <th className="px-4 py-2 border border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (    //for checking the array if empty or not 
              users.map((user) => (
                <tr key={user.email}>
                  <td className="px-4 py-2 border border-gray-300 text-center">{user.name}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">{user.email}</td>
                  {/* <td className="px-4 py-2 border border-gray-300 text-center">{user.gender}</td> */}
                  <td className="px-4 py-2 border border-gray-300 text-center">
                  <button onClick={() => setSelectedUser(user)} className="bg-blue-500 text-white px-4 py-2 mr-4 rounded">
                      View
                    </button>
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
      

      {/* view wale button ka code */}
      {selectedUser && (  // if selectd user not null tbhi chlega
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl text-center font-bold mb-4">User Details</h3>
            <p className="mb-2">
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p className="mb-2">
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p className="mb-2">
              <strong>Phone Number:</strong> {selectedUser.number}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Gender:</strong> {selectedUser.gender}
            </p>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    
  );
};

export default UsersTable;


// C:\Users\HP\Register(React-Express)\Register\src\App.jsx