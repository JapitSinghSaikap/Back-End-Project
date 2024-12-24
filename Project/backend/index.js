const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();



app.use(cors());
app.use(bodyParser.json()); 


let users = [];

//frontend se data receive krene ke liye
app.post("/register", (req, res) => {
  //using the body-barser for the req and res
  const { name, email, password, gender} = req.body;
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User with this email already exists." });
  }
  const newUser = { name, email, password, gender };
  users.push(newUser);
  console.log(newUser);
  return res.status(200).json({ message: "User registered successfully", user: newUser });//used status code for response (200-299)->for good
});




//data bhejne ke liye 
app.get("/users",(req,res)=>{
  return res.status(200).json(users);//hume apne sare users array bhejne ke liye
})



//Login check krne ke liye
app.post("/login", (req, res) => {
  const { email, password } = req.body; 
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" }); 
  }
  console.log(users);
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" }); 
  }
  return res.status(200).json({ message: "Login successful", user });
});


//delete functionality add krdi
app.delete("/users/email", (req, res) => {
  const { email } = req.body;
  users = users.filter((user) => user.email !== email);
  return res.status(200).json({
    // success: true,
    message: email,
    data : users,
  });
});


app.listen(5000, () => {
  console.log(`Server is running on 5000`);
});
