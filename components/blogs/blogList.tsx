import BlogCard from "./blogCard";

const BlogList = (props: any) => {
  return (
    <ul className="grid grid-cols-3  flex-wrap: wrap">
      {props.featuredBlogList.map((data: any) => (
        <BlogCard
          key={data.id}
          id={data.id}
          description={data.description}
          category={data.category}
          image={data.image}
          isFeatured={data.isFeatured}
          title={data.title}
        />
      ))}
    </ul>
  );
};
export default BlogList;
