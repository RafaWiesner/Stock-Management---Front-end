import api from "./api";

const getProducts = async () => {
    try {
        const products = await api.get("/");
        return products.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error)
        throw error;
    }
}

const createProduct =  async (data) => {
    try {
        const newProduct = await api.post("/", data)
        return newProduct.data;
    } catch (error) {
        console.error("Erro ao criar um novo produto:", error)
        throw error;
    }
}

const updateProduct = async (id, data) => {
    try {
        const updatedProduct = await api.patch(`/${id}`, data)
        return updatedProduct.data;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error)
        throw error;
    }
}

const deleteProduct = async (id) => {
try {
    await api.delete(`/${id}`)
    return {message: "Produto excluído com sucesso"}
} catch (error) {
    console.error("Erro ao excluir produto:", error)
    throw error;
}
}

export {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}