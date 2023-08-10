import React from 'react';
import { Routes, Route} from "react-router-dom";
import Loginform from './components/login';
import RegistrationForm from './components/registration';
import Orderform from './components/orderForm';
 import Order from './components/orderList';
import ChatPage from './components/chatpage';
const App = () => {

  return (
    
    <Routes>
        <Route path="/" element={<Loginform/>} />
        <Route path="/register" element={<RegistrationForm/>} />
      <Route path="/orderform" element={<Orderform />} />
      <Route path="/orders" element={<Order />} />  
      <Route path="/chats/:roomId" element={<ChatPage/>} />
    </Routes>
  );
};

export default App;
