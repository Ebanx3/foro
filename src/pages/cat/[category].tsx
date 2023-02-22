import { useRouter } from "next/router";
import CategoryModel from "../../database/models/categories";
import ThreadModel from "../../database/models/thread";
import Link from "next/link";
import SubCategory from "@/components/SubCategory";
import { useContext } from "react";
import { context } from "@/UserContext";

const Categoria = ({ subcategories, threads }: any) => {
  const route = useRouter();

  const { user }: any = useContext(context);

  return (
    <div className="flex flex-col w-3/5 m-auto">
      {subcategories.map((sc: string) => {
        return <SubCategory key={sc} subcategory={sc} />;
      })}
      {user.username ? (
        <Link
          href={`/nuevo-hilo/${route.query.category}`}
          className="py-1 px-2 bg-rose-600 self-end text-white rounded-full hover:bg-rose-500 mt-2"
        >
          Nuevo hilo
        </Link>
      ) : (
        <></>
      )}

      {/* {threads.map((thread: string) => {
        return <SubCategory key={sc} subcategory={sc} />;
      })} */}
    </div>
  );
};

export async function getServerSideProps(datos: any) {
  // console.log(datos);

  const category = await CategoryModel.findOne({ name: datos.query.category });

  console.log(category);

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
