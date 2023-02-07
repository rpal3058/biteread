import BlogList from "./blogList";
import { useEffect, useState } from "react";
import { getFeaturedBlogs } from "../../dummy-data";

const FeaturedBlog = () => {
  const [featuredBlogList, setFeaturedBlogList] = useState([]);
  useEffect(() => {
    let temp: any;
    temp = getFeaturedBlogs();
    setFeaturedBlogList(temp);
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 pt-12 pb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Featured Blogs
        </h1>
        <div className="h-screen ">
          <BlogList featuredBlogList={featuredBlogList} />
        </div>
      </div>
    </>
  );
};

export default FeaturedBlog;
