import React from "react";
import { getSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import Header from "../../components/ui/header";
import LeftHalf from "../../components/ui/leftHalf";
import RightHalf from "../../components/ui/rightHalf";
const Create = () => {
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
export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
export default Create;
