import Image from "next/image";
import Link from "next/link";

const ForumCategory = ({ category }: { category: any }) => {
  return (
    <div className="flex m-6 rounded-lg px-8 py-2 bg-white">
      <Image
        src={`/img/${category.imgUrl}`}
        width={120}
        height={120}
        alt={`${category.name}`}
      />
      <div className="flex flex-col ml-4">
        <Link
          href={`/categoria/${category.name.toLowerCase()}`}
          className="font-bold text-xl text-rose-500 uppercase"
        >
          {category.name}
        </Link>
        <div>
          {category.subCategory.map((cat: string) => (
            <Link
              href={`/topic/${category.name.toLowerCase()}-${cat}`}
              key={`${cat}`}
              className="mr-2 font-bold text-slate-400"
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
