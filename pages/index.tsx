import { Fragment, useEffect, useState } from "react";
import Header from "../components/ui/header";
import LeftHalf from "../components/ui/leftHalf";
import RightHalf from "../components/ui/leftHalf";
import FeaturedBlog from "../components/blogs/featuredBlog";

const Index = () => {
  return (
    <Fragment>
      <div className="h-screen grid grid-cols-2 flex-wrap">
        <div className="col-span-1 bg-[#B70808] bg-opacity-80">
          <Header />
          <LeftHalf />
        </div>
        <div className="col-span-1 bg-white"></div>
      </div>
      <FeaturedBlog />
    </Fragment>
  );
};

export default Index;
