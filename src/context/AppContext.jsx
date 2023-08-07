import { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState("");

  return (
    <Context.Provider
      value={{ loading, setLoading, user, setUser, alert, setAlert }}
    >
      {children}
    </Context.Provider>
  );
}
