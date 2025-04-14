import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import "../login/Login.css";

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = await registerUser(name, email, password);
      dispatch({ type: "LOGIN", payload: newUser });
      navigate("/");
    } catch (error) {
      alert("Erro ao se cadastrar. Tente outro e-mail.");
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="login-form">
        <h2>Criar Conta</h2>
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
        <button
          type="button"
          className="access-without-account"
          onClick={() => navigate("/login")}
        >
          Já tem uma conta? Fazer login
        </button>
      </form>
    </div>
  );
};

export default Register;
