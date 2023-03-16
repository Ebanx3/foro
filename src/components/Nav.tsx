import React, { useState } from "react";
import Link from "next/link";
import Login from "./Login";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleUserPanel = () => {
    showLogin ? setShowLogin(false) : setShowLogin(true);
  };

  return (
    <nav className=" h-12 sticky top-0 bg-cyan-800 flex flex-row justify-between  px-10 flex-nowrap items-end z-20">
      <Link href="/" className="font-bold text-3xl text-white hover:text-white">
        code-foro
      </Link>

      <div className="flex items-end pb-2">
        <div className="relative">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="buscar..."
            className="mr-4 bg-cyan-50 rounded-full text-center text-black focus:outline-none w-28 focus:w-52 transition-all ease-linear"
          />
          <button className="text-white h-6 w-6 overflow-hidden absolute right-4 -bottom-0 bg-cyan-600 rounded-full hover:bg-orange-500 ">
            <FontAwesomeIcon icon={solid("magnifying-glass")} />
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
