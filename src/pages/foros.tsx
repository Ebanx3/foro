import ForumCategory from "@/components/ForumCategory";
import CategoryModel from "../../src/database/models/categories";

/*
<ForumCategory
          category={{
            name: "General",
            imgUrl: "general.png",
            topics: ["Presentate", "Reglas", "Sugerencias"],
            description: "",
          }}
        />
*/

const Foros = ({ cats }: any) => {
  return (
    <div className="flex">
      <div className="w-1/5"></div>
      <div className="w-3/5">
        {cats.map((cat: any) => {
          return <ForumCategory key={cat.id} category={cat} />;
        })}
      </div>
      <div className="w-1/5 bg-white border-l-2">publicidad</div>
    </div>
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
