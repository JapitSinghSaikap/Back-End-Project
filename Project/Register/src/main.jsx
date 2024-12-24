import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginPage from './login.jsx'
import UsersTable from "./register.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<UsersTable/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
