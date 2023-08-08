import React from 'react';
import { Routes, Route} from "react-router-dom";
import Loginform from './components/login';
import RegistrationForm from './components/registration';
// import ManufacturerLanding from './components/ManufacturerLanding';
// import ManufacturerInputForm from './components/ManufacturerInputForm';

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Loginform/>} />
        <Route path="/register" element={<RegistrationForm/>} />
        {/* <Route path="/manufacturer-landing" component={ManufacturerLanding} />
        <Route path="/add-item" component={ManufacturerInputForm} />  */}
    </Routes>
  );
};

export default App;
