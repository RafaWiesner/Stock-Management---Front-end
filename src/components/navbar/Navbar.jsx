import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { Button } from "@mui/material";
import { deleteProduct } from "../../api/products";
import { ProductContext } from '../../context/ProductsContext';

const Navbar = () => {
  const { state, dispatch } = useContext(ProductContext);
  const [menuOpen, setMenuOpen] = useState(false); // Estado do menu

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(state.selectedProduct.id);
      dispatch({ type: "removeProduct", payload: state.selectedProduct.id });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const searchProductInput = (e) => {
    dispatch({
      type: "searchProductInput",
      payload: e.target.value
    });
  };

  return (
    <div className={`navbar ${menuOpen ? "expanded" : ""}`}>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        {!menuOpen ? "☰" : "x" }
        
      </button>

      <div className="buttons">
        <Button onClick={() => dispatch({ type: "onPopUpOpen" })}>
          {!state.selectedProduct ? "Adicionar" : "Editar"}
        </Button>

        {state.selectedProduct && <Button onClick={handleDeleteProduct}>Excluir</Button>}

        <div>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={state.searchInputValue}
            className="search-input"
            onChange={searchProductInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
