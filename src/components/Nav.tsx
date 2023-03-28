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
    <nav className="sticky top-0 h-20 flex flex-row justify-center bg-cyan-800 p-5 flex-nowrap items-center z-20">
      <Link
        href="/"
        className="font-bold text-3xl text-white hover:text-orange-300"
      >
        code-foro
      </Link>
      <span
        className="font-bold text-sm text-white hover:text-orange-300 cursor-pointer mx-6"
        onClick={() => {
          handleUserPanel();
        }}
      >
        USUARIO
      </span>
      {/* <div className="relative flex flex-row items-center">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="buscar..."
          className="mr-4 bg-cyan-900 rounded-full text-center text-white focus:outline-none w-28 focus:w-52 transition-all ease-linear border-2 border-cyan-500"
        />
        <button className="text-white h-8 w-8 overflow-hidden absolute right-3  bg-cyan-600 rounded-full hover:bg-orange-500 ">
          <FontAwesomeIcon icon={solid("magnifying-glass")} />
        </button>
      </div> */}

      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
    </nav>
  );
};

export default Nav;
