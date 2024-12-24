import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", isTouched: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", isTouched: false });
  const navigate = useNavigate();


  //regex check of the mail
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  //for checking the validity of the form
  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      validateEmail(email) &&
      password.value.length >= 8 &&
      gender !== "" &&
      password.value === confirmPassword.value
    );
  };


  //for manual clearing of the form
  const clearForm = () => {
    setName("");
    setGender("");
    setEmail("");
    setPassword({ value: "", isTouched: false });
    setConfirmPassword({ value: "", isTouched: false });
  };

  const handleLogin = async (e) => {
    //for preventing the reloading of the page 
    e.preventDefault();
  

    //the object
    const userData = {
      name: name,
      gender: gender,
      email: email,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };
  

    if (isFormValid()) {
      //using fetch to post the details to the index.js
      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
       //for server response
        if (response.ok) {
          const data = await response.json();//used with async
          console.log('Success: ', data);
          alert('User registered successfully! Redirecting...');
          navigate("/login");
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData.message); 
          alert(`Error: ${errorData.message}`);
        }

        //for handling netwrok errors or server errors
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error with the request. Please try again.'); 
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Registeration Form</h1>
        <form onSubmit={handleLogin}>
          {/* name ke liye */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* email ke liye */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!validateEmail(email) && email.length > 0 && (
              <p className="text-red-500 text-sm mt-1">Invalid email format</p>
            )}
          </div>

          {/* password ke liye */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Password:</label>
            <input
              type="password"
              value={password.value}
              onChange={(e) => setPassword({ ...password, value: e.target.value })}
              onBlur={() => setPassword({ ...password, isTouched: true })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {password.isTouched && password.value.length < 8 && (
              <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters long</p>
            )}
          </div>

          {/* confirm password ke liye */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword.value}
              onChange={(e) => setConfirmPassword({ ...confirmPassword, value: e.target.value })}
              onBlur={() => setConfirmPassword({ ...confirmPassword, isTouched: true })}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {confirmPassword.isTouched && password.value !== confirmPassword.value && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="px-6 py-2 mt-3 rounded-lg text-white font-medium bg-blue-500 hover:bg-blue-600"
              type="submit"
            >
              Register
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-2 mt-3 rounded-lg text-gray-700 border border-gray-400 hover:bg-gray-100"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
