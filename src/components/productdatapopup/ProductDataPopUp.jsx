import React, { useContext, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext';
import { AuthContext } from '../../context/AuthContext';
import { createProduct, updateProduct } from '../../api/products';
import "./ProductDataPopUp.css"

const ProductDataPopUp = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "type") {
      if (!/^[A-Za-zÀ-ÿ\s]*$/.test(value)) {
        error = "Somente letras são permitidas.";
      }
    }

    if (name === "price" || name === "stock") {
      if (value === "") {
        error = "";
      } else if (isNaN(value) || Number(value) < 0) {
        error = "O valor deve ser maior que zero.";
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));

    dispatch({
      type: "updatePopUpInputsValues",
      payload: { name, value }
    });
  };

  const handleProductSave = async (e) => {
    e.preventDefault();

    try {
      if (state.selectedProduct) {
        await updateProduct(state.selectedProduct.id, state.popUpInputsValues);
        dispatch({
          type: "updateProduct",
          payload: { id: state.selectedProduct.id, ...state.popUpInputsValues }
        });
      } else {
        const savedProduct = await createProduct(state.popUpInputsValues, user?.id);
        dispatch({
          type: "getProducts",
          payload: [...state.products, savedProduct]
        });
      }

      dispatch({ type: "onPopUpClose" });
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <button className="close-btn" onClick={() => dispatch({ type: "onPopUpClose" })}>&times;</button>
        <h2>{state.selectedProduct ? "Editar Produto" : "Adicionar Produto"}</h2>
        <form onSubmit={handleProductSave}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={state.popUpInputsValues.name}
              onChange={handleChange}
              placeholder="Digite o nome do produto"
              maxLength={40}
              required
            />
          </label>
          <label>
            Tipo:
            <input
              type="text"
              name="type"
              value={state.popUpInputsValues.type}
              onChange={handleChange}
              placeholder="Digite o tipo do produto"
              maxLength={20}
              required
            />
            {errors.type && <span className="error-msg">{errors.type}</span>}
          </label>
          <label>
            Preço:
            <input
              type="number"
              name="price"
              step="0.01"
              value={state.popUpInputsValues.price}
              onChange={handleChange}
              placeholder="Digite o preço"
              maxLength={12}
              required
            />
            {errors.price && <span className="error-msg">{errors.price}</span>}
          </label>
          <label>
            Estoque:
            <input
              type="number"
              name="stock"
              value={state.popUpInputsValues.stock}
              onChange={handleChange}
              placeholder="Digite a quantidade em estoque"
              maxLength={6}
              required
            />
            {errors.stock && <span className="error-msg">{errors.stock}</span>}
          </label>
          <button type="submit" className="save-btn">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDataPopUp;
