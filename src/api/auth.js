import api from "./api";

const loginUser = async (email, password) => {
  try {
    const userLoginData = await api.post("/users/login", { email, password });
    return userLoginData.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    throw error;
  }
};

const registerUser = async (name, email, password) => {
    try {
        const registeredUser = await api.post("/users/register", { name, email, password });
        return registeredUser.data;
    } catch (error) {
        console.error("Erro ao se cadastrar:", error)
        throw error;
    }
};

export {
    loginUser,
    registerUser
}