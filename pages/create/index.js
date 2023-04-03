import React, { useState, createContext } from "react";
import { getSession } from "next-auth/react";
import { Fragment } from "react";
import LeftHalf from "../../components/ui/leftHalf";
import RightHalf from "../../components/ui/rightHalf";
import RightEditorSpace from "../../components/ui/right-editor/rightEditorSpace"; // EditorContextRight,
import LeftEditorSpace from "../../components/ui/left-editor/leftEditorSpace";
import { v4 as uuidv4 } from "uuid";

export const contentContext = createContext({});

const Create = ({ sessions }) => {
  const [header, setHeader] = useState("");
  const [rightContent, setRightContent] = useState("");
  const [leftContent, setLeftContent] = useState("");

  const handleSave = async (event) => {
    event.preventDefault();
    const blogId = uuidv4().substr(0, 8);
    let username = sessions.user.email;
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          blogId: blogId,
          username: username,
          header: header,
          blogLeft: leftContent,
          blogRight: rightContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error response from server");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <contentContext.Provider
        value={{ rightContent, setRightContent, leftContent, setLeftContent }}
      >
        <div className="h-screen overflow-hidden grid grid-cols-2 flex-wrap">
          <div className="col-span-1 bg-[#B70808] bg-opacity-80 ">
            <div>
              <input
                type="text"
                placeholder="Enter the Header"
                onChange={(e) => {
                  setHeader(e.target.value);
                }}
                className="m-2 col-span-1 tracking-widest w-5/6 bg-slate-50 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <LeftHalf displayType={"editor"} display={LeftEditorSpace} />
          </div>

          <div className="col-span-1 bg-whites">
            <RightHalf displayType={"editor"} display={RightEditorSpace} />
            <div className="flex justify-end m-4 px-6 py-3">
              <button
                className="bg-[#B70808] bg-opacity-80 hover:bg-[#B70808] bg-opacity-80:132 text-white px-12 py-2 rounded-xl"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </contentContext.Provider>
    </Fragment>
  );
};
export async function getServerSideProps(context) {
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
    props: { sessions: session },
  };
}
export default Create;
