import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const context = createContext({});
const Provider = context.Provider;

export const UserContext = ({ children }: any) => {
  const userLS =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData") ?? "{}")
      : {};
  console.log();
  const [user, setUser] = useState(userLS);
  const [siteReady, setSiteReady] = useState(false);
  useEffect(() => {
    setSiteReady(true);
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData") || "{}"));
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  return siteReady ? (
    <Provider value={{ user, setUser }}>{children}</Provider>
  ) : null;
};
