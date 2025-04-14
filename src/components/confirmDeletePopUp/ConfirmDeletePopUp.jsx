import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductsContext';
import './ConfirmDeletePopUp.css'; // crie estilos se quiser

const ConfirmDeletePopUp = () => {
  const { state, dispatch } = useContext(ProductContext);

  if (!state.ConfirmDeletePopUp.isOpen) return null;

  return (
    <div className="overlay">
      <div className="popup confirm-popup">
        <p>{state.ConfirmDeletePopUp.message}</p>
        <div className="popup-actions">
          <button
            className="confirm-btn"
            onClick={() => dispatch({ type: "confirmDelete" })}
          >
            Confirmar
          </button>
          <button
            className="cancel-btn"
            onClick={() => dispatch({ type: "closeConfirmDeletePopUp" })}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopUp;
