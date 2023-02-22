import { useContext, useState } from "react";
import Link from "next/link";
import { context } from "@/UserContext";
import UserMenu from "./UserMenu";
import jwt from "jsonwebtoken";

const Login = ({ setShowLogin }: { setShowLogin: Function }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [alert, setAlert] = useState<string>("");

  const { user, setUser }: any = useContext(context);

  const handleLogin = async () => {
    if (username != "" && password != "") {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "Application/json" },
      });
      const response = await res.json();
      if (response.message == "Invalid username") {
        return showAlert("Nombre de usuario inválido");
      }
      if (response.message == "Invalid password") {
        return showAlert("Password inválido");
      }
      const json: string = res.headers.get("auth-token") || "";
      const userData = jwt.decode(json);

      setUser(userData);
      setShowLogin();
    } else {
      return showAlert("Completa ambos campos");
    }
  };

  const showAlert = (str: string) => {
    setAlert(str);
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  return (
    <div className=" absolute right-0 top-16 bg-zinc-300 p-4 userP">
      {user?.username ? (
        <UserMenu />
      ) : (
        <form className="flex flex-col items-center">
          <input
            type="text"
            value={username}
            className="mt-1 text-center rounded-full"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="username"
          />
          <input
            type="password"
            value={password}
            className="mt-2 text-center rounded-full"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
          <button
            type="button"
            className="bg-rose-400 p-1 px-2 rounded-full text-white mt-2 hover:bg-rose-500"
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </button>
          <span className="text-sm mt-2">No tienes una cuenta?</span>
          <Link
            href="/registrate"
            className="font-bold text-rose-600 text-sm hover:text-rose-400"
          >
            CREA UNA
          </Link>
        </form>
      )}
      {alert != "" ? (
        <span className="absolute text-white bg-red-600 rounded-md text-center p-1">
          {alert}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
