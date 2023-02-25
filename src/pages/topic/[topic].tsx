import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { context } from "@/UserContext";
import Thread from "../../components/Thread";
import ThreadModel from "../../database/models/thread";

const Topic = ({ threads }: any) => {
  const route = useRouter();

  const { user }: any = useContext(context);

  return (
    <div className="flex flex-col w-11/12 m-auto">
      <br />
      {user.username ? (
        <Link
          href={`/nuevo-hilo/${route.query.topic}`}
          className="py-1 px-2 bg-cyan-600 self-end text-white rounded-full hover:bg-black mt-2"
        >
          Nuevo hilo
        </Link>
      ) : (
        <></>
      )}

      {threads.map((thread: any) => {
        return <Thread key={thread.id} thread={thread} />;
      })}
    </div>
  );
};

export async function getServerSideProps(datos: any) {
  const threads = await ThreadModel.find({ category: datos.query.topic });

  const formatedThreads = threads.map((thread) => {
    return {
      id: thread._id.toString(),
      ownerInfo: thread.ownerInfo,
      title: thread.title,
      lastCommenter: thread.lastCommenter,
      type: thread.type,
      createdAt: thread.createdAt.toString(),
      updatedAt: thread.updatedAt.toString(),
    };
  });

  return {
    props: {
      threads: formatedThreads,
    },
  };
}

export default Topic;
