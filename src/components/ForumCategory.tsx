import Image from "next/image";
import Link from "next/link";

const ForumCategory = ({ category }: { category: any }) => {
  return (
    <div className="flex m-6 rounded-lg px-8 py-2 shadow-sm bg-white shadow-zinc-400">
      <div className="flex items-center">
        <Image
          src={`/img/${category.imgUrl}`}
          height={100}
          width={100}
          priority
          alt={`${category.name}`}
          className="object-contain h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28"
        />
      </div>

      <div className="flex flex-col items-start ml-4">
        <Link
          href={`/cat/${category.name.toLowerCase()}`}
          className="font-bold text-md lg:text-xl text-sky-700 uppercase hover:text-blue-400 mt-4"
        >
          {category.name}
        </Link>
        <div className="flex flex-wrap">
          {category.subCategory.map((cat: string) => (
            <Link
              href={`/topic/${cat}`}
              key={`${cat}`}
              className="mr-2 font-bold text-md text-slate-500 hover:text-slate-400 uppercase"
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
