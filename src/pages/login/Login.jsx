import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import "./Login.css";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await loginUser(email, password); 
      dispatch({ type: "LOGIN", payload: user }); 
      navigate("/"); 
    } catch (error) {
      alert("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccessWithoutAccount = () => {
    dispatch({ type: "ACCESS_WITHOUT_ACCOUNT" });
    navigate("/");
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>

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

        <button type="submit" disabled={loading}>
          {loading ? "Conectando..." : "Entrar"}
        </button>

        {loading && (
          <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "8px" }}>
            O servidor pode demorar alguns segundos para iniciar, aguarde...
          </p>
        )}

        <button
          type="button"
          onClick={handleAccessWithoutAccount}
          className="access-without-account"
          disabled={loading}
        >
          Acessar como visitante
        </button>
        <button
          type="button"
          onClick={handleGoToRegister}
          className="go-to-register"
          disabled={loading}
        >
          Criar conta
        </button>
      </form>
    </div>
  );
};

export default Login;
