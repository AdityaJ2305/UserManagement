import React from 'react';
import { Route, Routes } from 'react-router-dom';
import User from './Components/User';
import EditUser from './Components/EditUser';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/user/:id" element={<User />} /> 
        <Route path="/edit-user/:id" element={<EditUser />} /> 
      </Routes>
    </div>

  );
};

export default App;
