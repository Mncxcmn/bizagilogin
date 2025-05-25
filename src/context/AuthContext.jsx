import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <AuthContext.Provider value={{ email, setEmail, password, setPassword,name,
        setName,
        phone,
        setPhone, }}>
      {children}
    </AuthContext.Provider>
  );
};
