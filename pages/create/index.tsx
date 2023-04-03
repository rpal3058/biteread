import React from "react";
import { getSession } from "next-auth/react";
import { Fragment } from "react";
import Header from "../../components/ui/header";
import LeftHalf from "../../components/ui/leftHalf";
import RightHalf from "../../components/ui/rightHalf";
import RightEditorSpace from "../../components/ui/right-editor/rightEditorSpace";
import LeftEditorSpace from "../../components/ui/left-editor/leftEditorSpace";

const Create = () => {
  function headerUpdate(event: any) {
    return <Header header={event.target.value} />;
  }

  return (
    <Fragment>
      <div className="h-screen overflow-hidden grid grid-cols-2 flex-wrap">
        <div className="col-span-1 bg-[#B70808] bg-opacity-80 ">
          <div>
            <input
              type="text"
              placeholder="Enter the Header"
              onChange={headerUpdate}
              className="m-2 col-span-1 tracking-widest w-5/6 bg-slate-50 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <LeftHalf displayType={"editor"} display={LeftEditorSpace} />
        </div>

        <div className="col-span-1 bg-whites">
          <RightHalf displayType={"editor"} display={RightEditorSpace} />
          <div className="flex justify-end m-4 px-6 py-3">
            <button className="bg-[#B70808] bg-opacity-80 text-white px-12 py-2 rounded-md">
              Save
            </button>
          </div>
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
