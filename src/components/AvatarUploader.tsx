import { context } from "@/UserContext";
import { useContext, useState } from "react";
import axios from "axios";

const AvatarUploader = ({
  selectedImage,
  setSelectedImage,
  username,
}: {
  selectedImage: any;
  setSelectedImage: Function;
  username: string;
}) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<
    ArrayBuffer | string | null
  >();

  const { user, setUser }: any = useContext(context);

  const setFileToBase = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };
  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;

      const { data } = await axios.post("/api/image", {
        userId: user.userId,
        image: selectedFile,
      });
      if (data.success === true) {
        setUser({
          ...user,
          urlAvatar: data.urlAvatar,
        });
      }
      if (data.message === "Unauthorized") {
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
            setFileToBase(file);
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
