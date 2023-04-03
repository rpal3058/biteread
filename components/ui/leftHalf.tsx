import React from "react";
const LeftHalf = (props: any) => {
  const { displayType } = props;
  return (
    <div>
      {displayType == "editor" ? <props.display /> : <div>{props.display}</div>}
    </div>
  );
};

export default LeftHalf;
