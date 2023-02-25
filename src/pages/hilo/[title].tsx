import ThreadModel from "../../database/models/thread";
import MessageModel from "../../database/models/message";
import { useState } from "react";

const Hilo = ({ messages, thread }: any) => {
  const [likes, setLikes] = useState(messages[0].likes);
  const [liked, setLiked] = useState(false);

  const handleAddLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (
    <div className="bg-white flex w-11/12 border-2 mt-4 relative">
      <div className="w-1/4 border-r-2 m-4">
        <span>{thread.ownerInfo.name}</span>
      </div>
      <div className="w-3/4 m-4">
        <h1 className="text-3xl inline-block mb-2 mr-2">{thread.title}</h1>
        {thread.type == "tutorial" ? (
          <span className="text-xs bg-blue-500 text-white uppercase font-bold p-1 rounded-full mr-2">
            {thread.type}
          </span>
        ) : (
          <></>
        )}
        {thread.type == "consulta" ? (
          <span className="text-xs bg-red-500 text-white uppercase font-bold p-1 rounded-full mr-2">
            {thread.type}
          </span>
        ) : (
          <></>
        )}
        <span className="text-zinc-400 block mb-6">{thread.createdAt}</span>
        <span className="mt-4">{messages[0].content}</span>
      </div>
      <button
        className="absolute right-1 bottom-1 flex items-center text-rose-400"
        onClick={() => {
          handleAddLike();
        }}
      >
        <span className="font-bold mr-1">{likes}</span>
        <span className="material-symbols-outlined">favorite</span>
      </button>
    </div>
  );
};

export async function getServerSideProps(datos: any) {
  const titleWithSpaces = datos.query.title.replace(/_/g, " ");

  const thread = await ThreadModel.findOne({ title: titleWithSpaces });

  const formatedThread = {
    id: thread._id.toString(),
    ownerInfo: thread.ownerInfo,
    title: thread.title,
    lastCommenter: thread.lastCommenter,
    type: thread.type,
    createdAt: thread.createdAt.toString(),
    updatedAt: thread.updatedAt.toString(),
  };

  const messages = await MessageModel.find({ threadId: thread._id });

  const formatedMessage = (msg: string): string => {
    console.log("msg inicial", msg);
    const res = msg.replace(/\\r\\n/g, "asdasd");
    console.log("mensaje formateado", res);
    return res;
  };

  const formatedMessages = messages.map((msg) => {
    return {
      id: msg._id.toString(),
      userInfo: msg.userInfo,
      content: formatedMessage(msg.content),
      likes: msg.likes,
      createdAt: msg.createdAt.toString(),
      updatedAt: msg.updatedAt.toString(),
    };
  });

  console.log(messages);

  return {
    props: {
      messages: formatedMessages,
      thread: formatedThread,
    },
  };
}

export default Hilo;
