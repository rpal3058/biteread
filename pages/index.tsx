import { Fragment, useEffect, useState } from "react";
import Header from "../components/ui/header";
import LeftContent from "../components/ui/leftContent";
import FeaturedBlog from "../components/blogs/featuredBlog";

const Index = () => {
  return (
    <Fragment>
      <div className="h-screen grid grid-cols-2 flex-wrap">
        <div className="col-span-1 bg-[#B70808] bg-opacity-80">
          <Header />
          <LeftContent />
        </div>
        <div className="col-span-1 bg-white"></div>
      </div>
      <FeaturedBlog />
    </Fragment>
  );
};

export default Index;
