import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className=" h-32 bg-slate-800 flex flex-row justify-between px-10 pb-2 items-end">
      <Link href="/" className="font-bold text-3xl text-rose-200">
        ex3
      </Link>
      <div>
        <Link
          href="/"
          className="font-bold text-sm text-indigo-100 mr-4 hover:text-white"
        >
          INICIO
        </Link>
        <Link
          href="/foros"
          className="font-bold text-sm text-indigo-100 mr-4 hover:text-white"
        >
          FOROS
        </Link>
        <span className="font-bold text-sm text-indigo-100 hover:text-white cursor-pointer">
          USUARIO
        </span>
      </div>
    </nav>
  );
};

export default Nav;
