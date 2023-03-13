import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import Header from "../../components/ui/header";
import LeftHalf from "../../components/ui/leftHalf";
import RightHalf from "../../components/ui/rightHalf";
import { useRouter } from "next/router";

const BlogPage = () => {
  const router = useRouter();
  const [blog, setBlog] = useState("");
  const blogId = router.query.blogId;
  useEffect(() => {
    const fetchData = async () => {
      if (blogId === undefined) return;
      try {
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error response from server");
        }
        const data = await response.json();
        if (Object.keys(data.blog).length !== 0) {
          setBlog(data.blog);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [blogId]);

  return (
    <Fragment>
      <div className="h-screen overflow-hidden grid grid-cols-2 flex-wrap">
        <div className="col-span-1 bg-[#B70808] bg-opacity-80">
          <Header header={"BLOG DETAILS"} />
          <LeftHalf content={"Provide all the details of the blog"} />
        </div>
        <div className="col-span-1 bg-whites">
          <RightHalf
            displayType={"non_editor"}
            display={<div dangerouslySetInnerHTML={{ __html: blog }} />}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPage;
