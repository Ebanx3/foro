import { context } from "@/UserContext";
import React, { useContext } from "react";

const UserMenu = () => {
  const { user, setUser }: any = useContext(context);

  const handleLogout = () => {
    setUser({});
  };

  return (
    <div className="flex flex-col p-2 w-48">
      <span className="font-bold mb-4">{user.username}</span>
      <button
        type="button"
        className="bg-slate-600 p-1 rounded-md text-white mt-1"
        onClick={() => {
          handleLogout();
        }}
      >
        Salir
      </button>
    </div>
  );
};

export default UserMenu;
