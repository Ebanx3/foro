import ForumCategory from "@/components/ForumCategory";
import CategoryModel from "../../src/database/models/categories";
import Layout from "@/components/Layout";
import Head from "next/head";
import Connection from "@/database/connection";

const Foros = ({ cats }: any) => {
  return (
    <>
      <Head>
        <title>Code-foro</title>
      </Head>
      <Layout>
        {cats.map((cat: any) => {
          return <ForumCategory key={cat.id} category={cat} />;
        })}
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  try {
    type category = {
      id: any;
      name: string;
      subCategory: string[];
      imgUrl: string;
    };

    await Connection.getInstance();

    const res = await CategoryModel.find({});
    const cats = res.map((cat) => {
      const cate: category = {
        id: cat._id.toString(),
        name: cat.name,
        subCategory: cat.subCategory,
        imgUrl: cat.imgUrl,
      };
      return cate;
    });

    return {
      props: {
        cats,
      },
    };
  } catch (error) {
    return {
      props: {
        cats: [],
      },
    };
  }
}

export default Foros;
