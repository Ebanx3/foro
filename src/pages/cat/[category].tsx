import { useRouter } from "next/router";
import CategoryModel from "../../database/models/categories";
import ThreadModel from "../../database/models/thread";
import Link from "next/link";
import SubCategory from "@/components/SubCategory";
import { useContext } from "react";
import { context } from "@/UserContext";
import Thread from "../../components/Thread";
import Layout from "@/components/Layout";

const Categoria = ({ subcategories, threads }: any) => {
  const route = useRouter();

  const { user }: any = useContext(context);

  return (
    <Layout>
      <div className="flex flex-col w-11/12 mx-auto my-8">
        {subcategories.map((sc: string) => {
          return <SubCategory key={sc} subcategory={sc} />;
        })}
        <br />
        {user.username ? (
          <Link
            href={`/nuevo-hilo/${route.query.category}`}
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
        {threads.length == 0 ? (
          <div className="p-8 bg-zinc-200 mt-8 rounded-lg text-center">
            No existen hilos en esta categoría
          </div>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(datos: any) {
  const category = await CategoryModel.findOne({ name: datos.query.category });
  const threads = await ThreadModel.find({ category: datos.query.category });

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
      subcategories: category.subCategory,
      threads: formatedThreads,
    },
  };
}

export default Categoria;
