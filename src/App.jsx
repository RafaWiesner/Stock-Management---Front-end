import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Data from './components/data/Data';
import ProductDataPopUp from './components/productdatapopup/ProductDataPopUp';
import { ProductContext } from './context/ProductsContext';
import { AuthContext } from './context/AuthContext';
import Login from './pages/login/Login';
import { useContext } from 'react';
import Register from './pages/register/Register';
import ConfirmDeletePopUp from './components/confirmDeletePopUp/ConfirmDeletePopUp';

function App() {
  const { state } = useContext(ProductContext);
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation(); 

  const isLoginPage = location.pathname === "/login"; 
  const isRegisterPage = location.pathname === "/register"; 

  return (
    <div className="app">
      {isAuthenticated && !isLoginPage && !isRegisterPage && <Navbar />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Data /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {state.isPopUpOpen && <ProductDataPopUp />}
      {state.confirmDeletePopUp.isOpen && <ConfirmDeletePopUp/>}
    </div>
  );
}

export default App;
