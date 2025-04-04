import React, { useContext, useRef } from 'react'
import { ProductContext } from '../../context/ProductsContext';
import { createProduct, updateProduct } from '../../api/products';
import "./ProductDataPopUp.css"

const ProductDataPopUp = () => {

  const {state, dispatch} = useContext(ProductContext)

    // Função para atualizar o formData no contexto enquanto o usuário digita
    const handleChange = (e) => {
      dispatch({
        type: "updatePopUpInputsValues",
        payload: { name: e.target.name, value: e.target.value }
      });
    };

  const handleProductSave = async (e) => {

    e.preventDefault();


    try {
      if (state.selectedProduct) {
        // Edição do produto
        await updateProduct(state.selectedProduct.id, state.popUpInputsValues);
        dispatch({ type: "updateProduct", payload: { id: state.selectedProduct.id, ...state.popUpInputsValues } });
      } else {
        // Criação do produto
        const savedProduct = await createProduct(state.popUpInputsValues);
        dispatch({ type: "getProducts", payload: [...state.products, savedProduct] });
      }

      dispatch({ type: "onPopUpClose" }); // Fecha o pop-up
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
    
  }

 

  return (
    <div className="overlay">
      <div className="popup">
      <button className="close-btn" onClick={() => dispatch({type: "onPopUpClose"})}>&times;</button>
        <h2>{state.selectedProduct ? "Editar Produto" : "Adicionar Produto"}</h2>
        <form onSubmit={handleProductSave}>
          <label>
            Nome:
            <input type="text" name="name" value={state.popUpInputsValues.name} onChange={handleChange} placeholder="Digite o nome do produto" required/>
          </label>
          <label>
            Tipo:
            <input type="text" name="type" value={state.popUpInputsValues.type} onChange={handleChange} placeholder="Digite o tipo do produto" required/>
          </label>
          <label>
            Preço:
            <input type="number" name="price" step="0.01" value={state.popUpInputsValues.price} onChange={handleChange} placeholder="Digite o preço" required/>
          </label>
          <label>
            Estoque:
            <input type="number" name="stock" value={state.popUpInputsValues.stock} onChange={handleChange} placeholder="Digite a quantidade em estoque" required/>
          </label>
          <button type="submit" className="save-btn">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDataPopUp;