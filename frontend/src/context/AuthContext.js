import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {

  try {

    const saved = localStorage.getItem("user");

    return saved && saved !== "undefined" ? JSON.parse(saved): null;

  } catch (e) {

    return null;

  }

});
 

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const API_URL = "http://localhost:5000/api/auth";

  // ✅ SIGNUP

  const signup = async (name, email, password, role = "customer") => {

    const res = await fetch(`${API_URL}/register`, {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({ name, email, password, role }),

    });

    const data = await res.json();

    if (!res.ok) {

      throw new Error(data.msg || "Signup failed");

    }

    return data;

  };

  // ✅ LOGIN

  const login = async (email, password) => {

    const res = await fetch(`${API_URL}/login`, {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({ email, password }),

    });

   

    if (!res.ok) {

      throw new Error(data.msg || "Login failed");

    }
     const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({email:data.email,role:data.role}));

    setUser({email: data.email, role:data.role});

  };

  // ✅ LOGOUT

  const logout = () => {

    setUser(null);

    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

  };

  return (
<AuthContext.Provider value={{ user, token, signup, login, logout }}>

      {children}
</AuthContext.Provider>

  );

}

export const useAuth = () => useContext(AuthContext);
 
