import { context } from "@/UserContext";
import React, { useContext, useState } from "react";
import AvatarUploader from "./AvatarUploader";
import Image from "next/image";

const UserMenu = ({ handleShowAvatarUploader }: any) => {
  const [selectedImage, setSelectedImage] = useState("");

  const { user, setUser }: any = useContext(context);

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    setUser({});
  };

  return (
    <div className="flex flex-col p-2 w-48 relative">
      {selectedImage ? (
        <div className="w-36 h-36 overflow-hidden border-2 relative">
          <Image
            src={selectedImage}
            alt="avatar"
            fill
            sizes="(width: 144px) (height: 144px)"
            className="object-cover relative top-0"
          />
        </div>
      ) : (
        <></>
      )}
      <span className="font-bold mb-4">{user.username}</span>
      {user.urlAvatar ? (
        <div className="w-36 h-36 overflow-hidden border-2 relative">
          <Image
            src={user.urlAvatar}
            alt="avatar"
            fill
            sizes="(width: 144px) (height: 144px)"
            className="object-cover relative top-0"
          />
        </div>
      ) : (
        <></>
      )}

      <AvatarUploader
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        username={user.username}
      />

      <button
        type="button"
        className="bg-slate-600 p-1 rounded-md w-2/3 text-sm text-white mt-4"
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
