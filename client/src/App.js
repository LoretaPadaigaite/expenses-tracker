
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { PageLayout } from './Components/PageLayout/PageLayout';
import { Expenses } from './pages/Expenses/Expenses';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';


function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (user) => {
      setUser(user);
      navigate('/');
    }

  return (
    <div className="App">

    <Routes>
      <Route path='/'element={<PageLayout user={user} />} >
        <Route index element={<Expenses/>}/>
      </Route>
      
      <Route path='/login' element={<Login onSuccess={handleLoginSuccess} />} />

      <Route path='/register' element={<Register onSuccess={handleLoginSuccess} />} />
    </Routes>
 
    </div>
  );
}

export default App;
