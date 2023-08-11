import React from 'react';
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import Loginpage from './pages/loginpage';
import RegistrationForm from './components/registration';
import Orderform from './components/orderForm';
import ManufacturerOrderList from './pages/manufacturer';
import TransporterOrderList from './pages/transporter';
import ChatPage from './components/chatpage';

const App = () => {
  const token = localStorage.getItem('Token');
  let userRole = '';
  let userName = "";
  try {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
    userName = decodedToken.userName;
  } catch (error) {
   console.log(error)
  }

  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/register" element={<RegistrationForm />} />

      {userRole === 'Manufacturer' && (
        <>
          <Route path="/orderform" element={<Orderform userName={ userName} />} />
          <Route path="/Manufacturerorders" element={<ManufacturerOrderList />} />
        </>
      )}

      {userRole === 'Transporter' && (
        <Route path="/Transporterorders" element={<TransporterOrderList />} />
      )}

      <Route path="/chats/:roomId" element={<ChatPage userName={ userName}  />} />
    </Routes>
  );
};

export default App;
