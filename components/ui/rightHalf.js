import React from "react";
const RightHalf = (props) => {
  const { displayType } = props;
  return (
    <div>
      {displayType == "editor" ? <props.display /> : <div>{props.display}</div>}
    </div>
  );
};

export default RightHalf;
