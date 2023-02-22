import Link from "next/link";

const SubCategory = ({ subcategory }: { subcategory: string }) => {
  return (
    <Link
      href={`/topic/${subcategory}`}
      className="uppercase border-2 mt-1 border-zinc-300 rounded-lg px-8 py-2 h-24 bg-white flex items-center justify-center text-rose-400 font-bold text-xl hover:bg-zinc-200"
    >
      {subcategory}
    </Link>
  );
};

export default SubCategory;
