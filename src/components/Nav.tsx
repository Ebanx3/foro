import React, { useState } from "react";
import Link from "next/link";
import Login from "./Login";

const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleUserPanel = () => {
    showLogin ? setShowLogin(false) : setShowLogin(true);
  };

  return (
    <nav className=" h-16 sticky top-0 bg-zinc-800 flex flex-row justify-between pb-1 px-10 items-end">
      <Link href="/" className="font-bold text-3xl text-white hover:text-white">
        ex3
      </Link>
      <div>
        <Link
          href="/"
          className="font-bold text-sm text-white mr-4 hover:text-rose-300"
        >
          INICIO
        </Link>
        <Link
          href="/foros"
          className="font-bold text-sm text-white mr-4 hover:text-rose-300"
        >
          FOROS
        </Link>
        <span
          className="font-bold text-sm text-white hover:text-rose-300 cursor-pointer"
          onClick={() => {
            handleUserPanel();
          }}
        >
          USUARIO
        </span>
      </div>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
    </nav>
  );
};

export default Nav;
