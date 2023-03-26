import React, { useState } from "react";
import style from "./Blog.module.css";
import api from "../apis/api";
import { useDispatch, useSelector } from "react-redux";
import { overWrite } from "../store/blogsSlice";
import ReadMore from "./ReadMore";
import CreateModal from "./CreateModal";

const Blog = ({ blog, showMyBlogs }) => {
  const [showReadMore, setShowReadMore] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.blogs.allBlogs);
  const myBlogs = useSelector((state) => state.blogs.myBlogs);

  const handleShowReadMore = (e) => {
    e.preventDefault();
    setShowReadMore((prevState) => !prevState);
  };
  const handleShowEditModal = (e) => {
    e.preventDefault();
    setShowEditModal((prevState) => !prevState);
  };

  const deleteIt = async () => {
    await api.delete(`posts/${blog.id}`);
    dispatch(
      overWrite({
        allBlogs: allBlogs.filter((data) => data.id !== blog.id),
        myBlogs: myBlogs.filter((data) => data.id !== blog.id),
      })
    );
  };
  return (
    <div className={style.card}>
      <div className={style.content}>
        <h3>{blog.title}</h3>
        <div>
          {blog.body.length > 200 ? (
            <p>
              {blog.body.substring(0, 200)}
              <button
                className={style.btnReadMore}
                onClick={handleShowReadMore}
              >
                ...Read More
              </button>
            </p>
          ) : (
            <p>{blog.body}</p>
          )}
        </div>
      </div>
      {showMyBlogs === true && (
        <div className={style.btns}>
          <button onClick={handleShowEditModal}>Edit</button>
          <button onClick={deleteIt}>Delete</button>
        </div>
      )}

      {showReadMore === true && <ReadMore blog={blog} handleShowReadMore={handleShowReadMore} />}
      {showEditModal === true && <CreateModal id={blog.id} givenTitle={blog.title} givenBody={blog.body} handleShowModal={handleShowEditModal} />}
    </div>
  );
};

export default Blog;
