import React, { useState } from "react";
import style from "./CreateModal.module.css";
import api from "../apis/api";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, setMyBlogs, overWrite } from "../store/blogsSlice";

const CreateModal = ({
  id = null,
  givenTitle = "",
  givenBody = "",
  handleShowModal,
}) => {
  const [title, setTitle] = useState(givenTitle);
  const [body, setBody] = useState(givenBody);
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.blogs.allBlogs);
  const myBlogs = useSelector((state) => state.blogs.myBlogs);

  const isError = () => {
    if (title.trim() === "") {
      return true;
    } else if (body.trim() === "") {
      return true;
    }
    return false;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (isError()) {
      alert("Please fill in all fields");
      return;
    }

    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);

    if (id === null) {
      const response = await api.post(
        `users/${localStorage.getItem("id")}/posts`,
        formData
      );
      dispatch(setBlogs([response.data]));
      dispatch(setMyBlogs([response.data]));
    } else {
      const response = await api.put(`posts/${id}`, formData);

      const editedAllBlogs = allBlogs.map((blog) => {
        if (blog.id === id) {
          return response.data;
        }
        return blog;
      });
      const editedMyBlogs = myBlogs.map((blog) => {
        if (blog.id === id) {
          return response.data;
        }
        return blog;
      });

      dispatch(overWrite({ allBlogs: editedAllBlogs, myBlogs: editedMyBlogs }));
    }

    handleShowModal(e);
  };
  return (
    <div className={style.page} onClick={handleShowModal}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className={style.formCard}
      >
        <div>
          <label htmlFor="title" className={style.labelTitle}>
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={style.title}
            placeholder="Title"
          />
        </div>

        <div>
          <label htmlFor="body" className={style.labelBody}>
            Body
          </label>
          <textarea
            name="body"
            id="body"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className={style.body}
            placeholder="Type here"
          ></textarea>
        </div>

        <button type="submit" className={style.btnSubmit}>
          {id === null ? "Publish" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default CreateModal;
