import { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ loading, setLoading, user, setUser }}>
      {children}
    </Context.Provider>
  );
}
