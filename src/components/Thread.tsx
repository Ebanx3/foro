import Link from "next/link";

const Thread = ({ thread }: any) => {
  const titleUrl = thread.title.replace(/ /g, "_");

  return (
    <Link
      href={`/hilo/${titleUrl}`}
      className=" px-4 py-4 bg-white border-2 mt-1 hover:bg-zinc-200 flex justify-between"
    >
      <div className="flex flex-col">
        <div className="mb-2">
          {thread.type == "tutorial" ? (
            <span className="text-xs bg-blue-500 text-white uppercase font-bold p-1 rounded-full mr-2">
              {thread.type}
            </span>
          ) : (
            <></>
          )}
          {thread.type == "consulta" ? (
            <span className="text-xs bg-emerald-500 text-white uppercase font-bold p-1 rounded-full mr-2">
              {thread.type}
            </span>
          ) : (
            <></>
          )}
          <span className="font-bold p-1">{thread.title} </span>
        </div>
        <span className="text-zinc-400 font-bold mb-2">
          {thread.ownerInfo.name}
        </span>
        <span>{thread.createdAt}</span>
      </div>
      <div>
        <span className="text-sm">
          Ultimo comentario: {thread.lastCommenter}
        </span>
        <span></span>
      </div>
    </Link>
  );
};

export default Thread;
