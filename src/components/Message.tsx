import { useState, useContext, useEffect } from "react";
import { context } from "@/UserContext";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Remarkable } from "remarkable";
import EditingMessage from "./EditingMessage";
import Image from "next/image";
import formatDate from "@/formatDate";

const md = new Remarkable();

const Message = ({ message, title, type, deleteMessage }: any) => {
  const [likes, setLikes] = useState(message.likes);
  const [liked, setLiked] = useState(false);

  const [msg, setMsg] = useState(message);

  const [messageUser, setMessageUser] = useState({ urlAvatar: "", rol: "" });
  const [loadingUser, setLoadingUser] = useState(true);

  const [editing, setEditing] = useState(false);

  const { user }: any = useContext(context);

  const [imOwner, setImOwner] = useState(
    user.username === message.userInfo.name ||
      user.rol == "moderador" ||
      user.rol == "admin"
  );

  const handleAddLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  useEffect(() => {
    setImOwner(
      user.username === message.userInfo.name ||
        user.rol == "moderador" ||
        user.rol == "admin"
    );
  }, [user, message.userInfo.name]);

  useEffect(() => {
    setLoadingUser(true);
    fetch(`/api/user/${message.userInfo.userId}`)
      .then((res) => res.json())
      .then((user) => {
        setMessageUser(user.formatedUser);
        setLoadingUser(false);
      });
  }, []);

  return (
    <div className="bg-white flex flex-col sm:flex-row border-2 my-4 relative message">
      <div className="sm:w-1/5 sm:border-r-2 sm:p-4 p-1 flex sm:flex-col flex-row justify-center items-center">
        <div className="flex flex-col mr-2">
          <span className="font-bold text-cyan-600 text-lg">
            {message.userInfo.name}
          </span>
          {messageUser?.rol && messageUser.rol != "user" ? (
            <span className="bg-orange-600 text-white font-bold text-sm px-2 rounded-full">
              {messageUser.rol}
            </span>
          ) : (
            <></>
          )}
        </div>
        {!loadingUser && messageUser.urlAvatar ? (
          <div className="w-24 lg:w-36  h-24 lg:h-36 overflow-hidden relative mt-3">
            <Image
              src={messageUser.urlAvatar}
              alt="avatar"
              // width={300}
              // height={300}
              fill
              sizes="(width: 144px) (height: 144px)"
              className="object-cover relative top-0"
            />
          </div>
        ) : (
          <div className="w-36 h-36 overflow-hidden relative mt-3">
            <Image
              src={"/img/noAvatar.jpeg"}
              alt="avatar"
              // width={300}
              // height={300}
              fill
              sizes="(width: 144px) (height: 144px)"
              className="object-cover relative top-0"
            />
          </div>
        )}
      </div>

      <div className="w-4/5 mx-2 my-12">
        {editing ? (
          <EditingMessage
            msg={msg}
            message={msg}
            setMsg={setMsg}
            setEditing={setEditing}
            title={title}
            deleteMessage={deleteMessage}
          />
        ) : (
          <>
            <span className="text-zinc-400 block mb-2 text-sm text-end">
              {formatDate(message.createdAt)}
            </span>
            <h1 className="text-3xl inline-block my-4 mr-2">{title}</h1>
            {type == "tutorial" ? (
              <span className="text-xs bg-blue-500 text-white uppercase font-bold p-1 rounded-full mr-2">
                {type}
              </span>
            ) : (
              <></>
            )}
            {type == "consulta" ? (
              <span className="text-xs bg-red-500 text-white uppercase font-bold p-1 rounded-full mr-2">
                {type}
              </span>
            ) : (
              <></>
            )}

            <span
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: md.render(msg.content) }}
            />
            <div className="absolute right-1 bottom-1 flex">
              {imOwner ? (
                <button
                  className="text-white bg-zinc-400 rounded-md mr-2 p-1 flex items-center hover:bg-emerald-600"
                  onClick={() => setEditing(true)}
                >
                  <span className="text-sm mr-1">Editar</span>
                  <FontAwesomeIcon icon={solid("pencil")} />
                </button>
              ) : (
                <></>
              )}

              <button
                className={
                  !user.username
                    ? "text-white bg-zinc-400 rounded-md mr-2 p-1 flex items-center "
                    : "text-white bg-zinc-400 rounded-md mr-2 p-1 flex items-center hover:bg-rose-600 "
                }
                disabled={!user.username}
                onClick={() => {
                  handleAddLike();
                }}
              >
                <span className="font-bold mr-1">{likes}</span>
                <FontAwesomeIcon icon={solid("heart")} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
