import React from "react";
import { Fragment } from "react";

const BlogPage = () => {
  return (
    <Fragment>
      <div className="h-screen overflow-hidden grid grid-cols-2 flex-wrap">
        <div className="col-span-1 bg-[#B70808] bg-opacity-80">
          <Header header={"BLOG DETAILS"} />
          <LeftHalf content={"Provide all the details of the blog"} />
        </div>
        <div className="col-span-1 bg-whites">
          <RightHalf />
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPage;
