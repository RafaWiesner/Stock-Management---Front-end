import { createContext, useReducer } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
};


function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "ACCESS_WITHOUT_ACCOUNT":
      return {
        ...state,
        user: { email: "guest@demo.com" },
        isAuthenticated: true,
      };
    default:
      return state;
  }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
