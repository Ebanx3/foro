import ForumCategory from "@/components/ForumCategory";
import CategoryModel from "../../src/database/models/categories";

const Foros = ({ cats }: any) => {
  return (
    <>
      {cats.map((cat: any) => {
        return <ForumCategory key={cat.id} category={cat} />;
      })}
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
    console.log(error);
  }
}

export default Foros;
