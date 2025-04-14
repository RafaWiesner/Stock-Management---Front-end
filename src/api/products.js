import api from "./api";

const getProducts = async (userId) => {
    try {
      const products = await api.get("/products", {
        params: { userId }
      });
      return products.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
}

const createProduct = async (data, userId) => {
    try {
      const newProduct = await api.post("/products", {
        ...data,
        userId,
      });
      return newProduct.data;
    } catch (error) {
      console.error("Erro ao criar um novo produto:", error);
      throw error;
    }
  };

const updateProduct = async (id, data) => {
    try {
        const updatedProduct = await api.patch(`/products/${id}`, data)
        return updatedProduct.data;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error)
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        await api.delete(`/products/${id}`)
        return {message: "Produto excluído com sucesso"}
    } catch (error) {
        console.error("Erro ao excluir produto:", error)
        throw error;
    }
};

export {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}