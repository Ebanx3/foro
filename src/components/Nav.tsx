import React, { useState } from "react";
import Link from "next/link";
import Login from "./Login";

const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleUserPanel = () => {
    showLogin ? setShowLogin(false) : setShowLogin(true);
  };

  return (
    <nav className=" h-12 sticky top-0 bg-cyan-700 flex flex-row justify-between  px-10 flex-nowrap items-end z-20">
      <Link href="/" className="font-bold text-3xl text-white hover:text-white">
        x3T
      </Link>

      <div className="flex items-end pb-2">
        <div className="relative">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="buscar..."
            className="mr-4 bg-sky-100 rounded-full text-center text-black focus:outline-none w-28 focus:w-52 transition-all ease-linear"
          />
          <button className="text-white h-8 w-8 overflow-hidden absolute right-3 -bottom-1 bg-black rounded-full hover:bg-orange-500 ">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
        <Link
          href="/"
          className="font-bold text-sm text-white mr-4 hover:text-orange-400"
        >
          INICIO
        </Link>
        <Link
          href="/foros"
          className="font-bold text-sm text-white mr-4 hover:text-orange-300"
        >
          FOROS
        </Link>
        <span
          className="font-bold text-sm text-white hover:text-orange-300 cursor-pointer"
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
