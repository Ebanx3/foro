import Image from "next/image";
import Link from "next/link";

const ForumCategory = ({ category }: { category: any }) => {
  return (
    <div className="flex m-6 rounded-lg px-8 py-2 shadow-sm bg-white shadow-zinc-400">
      <Image
        src={`/img/${category.imgUrl}`}
        width={120}
        height={120}
        priority
        alt={`${category.name}`}
      />
      <div className="flex flex-col items-start ml-4">
        <Link
          href={`/cat/${category.name.toLowerCase()}`}
          className="font-bold text-xl text-sky-700 uppercase hover:text-blue-400 mt-4"
        >
          {category.name}
        </Link>
        <div>
          {category.subCategory.map((cat: string) => (
            <Link
              href={`/topic/${cat}`}
              key={`${cat}`}
              className="mr-2 font-bold text-slate-500 hover:text-slate-400 uppercase"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumCategory;
