import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({value:"",isTouched:"false"});
  const navigate = useNavigate();

  const clearForm = () => {
    // setName("");
    // setGender("");
    setEmail("");
    setPassword({ value: "",isTouched:false});
    // setConfirmPassword({ value: "", isTouched: false });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password.value) { 
      alert("Please fill out all fields.");
      return;
    }


    //the object for authentication
    const loginData = { 
       email,
       password: password.value 
    }; 
  
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Login successful! Redirecting...");
        navigate("/register");
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      // console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 ml-[8rem]">Login 📖</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            value={password.value}
            onChange={(e) => setPassword({ ...password, value: e.target.value })}
            onBlur={() => setPassword({ ...password, isTouched: true })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-[1.5rem]">
          Login
        </button>
        <button type="button" onClick={clearForm} className=" w-full px-6 py-2 mt-5 rounded-lg text-gray-700 border border-gray-400 hover:bg-gray-100">
              Clear Form
            </button>
      </form>
    </div>
  );
}

export default LoginPage;
