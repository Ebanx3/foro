import { context } from "@/UserContext";
import { useContext, useState } from "react";
import UserModel from "../database/models/users";

const AvatarUploader = ({ selectedImage, setSelectedImage, username }: any) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const { user, setUser }: any = useContext(context);

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append(`${username}`, selectedFile);

      const res = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });
      const response = await res.json();

      if (response.success) {
        const imageName = selectedFile.name.split(".");
        const urlAvatar = `/avatars/avatar-${username}.${
          imageName[imageName.length - 1]
        }`;
        // await UserModel.findByIdAndUpdate(user.userId, { urlAvatar });
        const res = await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.userId, urlAvatar }),
        });
        const response = await res.json();
        if (response.success) {
          setUser({
            ...user,
            urlAvatar,
          });
        }
      }
      if (response.message === "Unauthorized") {
        setUser({});
      }
    } catch (error) {}
    setUploading(false);
    setSelectedFile(undefined);
    setSelectedImage("");
  };

  return (
    <div className="w-3/4">
      <label
        htmlFor="avatarInput"
        className="text-zinc-500 font-bold uppercase text-sm"
      >
        {uploading ? "Subiendo" : "Subir Avatar"}
      </label>
      <input
        disabled={uploading}
        type="file"
        name="avatar"
        id="avatarInput"
        className="hidden"
        size={200000}
        accept="image/png, image/jpg, image/jpeg"
        onChange={({ target }) => {
          if (target.files) {
            const file = target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFile(file);
          }
        }}
      />
      {selectedImage ? (
        <button onClick={() => handleUpload()} disabled={uploading}>
          Confirmar
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AvatarUploader;
