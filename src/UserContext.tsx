import { createContext, useState } from "react";

export const context = createContext({});
const Provider = context.Provider;

export const UserContext = ({ children }: any) => {
  const [user, setUser] = useState({});

  return <Provider value={{ user, setUser }}>{children}</Provider>;
};
