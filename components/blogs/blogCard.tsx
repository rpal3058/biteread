import Link from "next/link";

const BlogCard = (props: any) => {
  return (
    <Link
      href={{
        pathname: "/blog/[id]",
        query: { id: props.id },
      }}
    >
      <div className="max-w-sm  rounded overflow-hidden shadow-lg ml-4 mb-2">
        <img className="w-full" src={props.image} alt={props.title}></img>
        <div className="px-6 py-2">
          <div className="font-bold text-xl mb-2">{props.title}</div>
          <p className="text-gray-700 text-sm max-h-6 overflow-hidden mb-4">
            {props.description}
          </p>
          <div className="text-blue-600 text-sm" v-if="contentExceedsLimit">
            Read More
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {props.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
