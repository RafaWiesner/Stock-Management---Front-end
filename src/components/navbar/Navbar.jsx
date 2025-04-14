import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { Button } from "@mui/material";
import { deleteProduct } from "../../api/products";
import { ProductContext } from '../../context/ProductsContext';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { state, dispatch } = useContext(ProductContext);
  const {user} = useContext(AuthContext)

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // redirecionamento

  const handleDeleteProduct = () => {
    dispatch({
      type: "openConfirmDeletePopUp",
      payload: {
        message: `Tem certeza que deseja excluir o produto "${state.selectedProduct.name}"?`,
        onConfirm: async () => {
          try {
            await deleteProduct(state.selectedProduct.id);
            dispatch({ type: "removeProduct", payload: state.selectedProduct.id });
          } catch (error) {
            console.error("Erro ao excluir produto:", error);
          }
        },
      },
    });
  };

  const searchProductInput = (e) => {
    dispatch({
      type: "searchProductInput",
      payload: e.target.value
    });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={`navbar ${menuOpen ? "expanded" : ""}`}>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        {!menuOpen ? "☰" : "x"}
      </button>

      <div className="buttons">
        <Button onClick={() => dispatch({ type: "onPopUpOpen" })}>
          {!state.selectedProduct ? "Adicionar" : "Editar"}
        </Button>

        {state.selectedProduct && <Button onClick={handleDeleteProduct}>Excluir</Button>}

        <input
          type="text"
          placeholder="Buscar produtos..."
          value={state.searchInputValue}
          className="search-input"
          onChange={searchProductInput}
        />
      </div>

      <div className="login-redirect">
  {user.name ? (
    <div className="user-info">
      <p className="user-name">Olá,{user.name}.</p>
      <button onClick={goToLogin} className="logout-button">Sair</button>
    </div>
  ) : (
    <button onClick={goToLogin} className="login-link">
      Olá! Entre ou cadastre-se.
    </button>
  )}
</div>
    </div>
  );
};

export default Navbar;
