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
        <h3 className={style.title}>{blog.title}</h3>
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
          <button onClick={handleShowEditModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>
          <button onClick={deleteIt}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </button>
        </div>
      )}

      {showReadMore === true && (
        <ReadMore blog={blog} handleShowReadMore={handleShowReadMore} />
      )}
      {showEditModal === true && (
        <CreateModal
          id={blog.id}
          givenTitle={blog.title}
          givenBody={blog.body}
          handleShowModal={handleShowEditModal}
        />
      )}
    </div>
  );
};

export default Blog;
