import { Routes, Route } from 'react-router-dom';
import './App.css';
import { PageLayout } from './Components/PageLayout/PageLayout';
import { UserContextWraper } from './Contexts/UserContextWraper';
import { Expenses } from './pages/Expenses/Expenses';
import { Login } from './pages/Login/Login';
import NotFound from './pages/PageNotFound/NotFound';
import { Register } from './pages/Register/Register';


function App() {

  return (
    <UserContextWraper >

    <Routes>
      <Route path='/'element={<PageLayout />} >
        <Route index element={<Expenses />}/>
      </Route>
      
      <Route path='/login' element={<Login />} />

      <Route path='/register' element={<Register/>} />

      <Route path="*" element={<NotFound />} />
       
    </Routes>
 
    </UserContextWraper>
  );
}

export default App;
