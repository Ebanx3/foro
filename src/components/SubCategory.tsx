import Link from "next/link";

const SubCategory = ({ subcategory }: { subcategory: string }) => {
  return (
    <Link
      href={`/topic/${subcategory}`}
      className="uppercase border-2 mt-1 border-cyan-300 rounded-lg px-8 py-2 h-24 bg-cyan-50 flex items-center justify-center text-cyan-600 font-bold text-sm lg:text-lg md:text-md xl:text-xl hover:bg-white"
    >
      {subcategory}
    </Link>
  );
};

export default SubCategory;
