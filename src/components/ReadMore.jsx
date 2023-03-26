import React from "react";
import style from "./CreateModal.module.css";
import readMore from "./ReadMore.module.css";

const ReadMore = ({ blog, handleShowReadMore }) => {
  return (
    <div className={style.page} onClick={handleShowReadMore}>
      <div
        className={readMore.card}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>{blog.title}</h1>
        <p className={readMore.body}>{blog.body}</p>
      </div>
    </div>
  );
};

export default ReadMore;
