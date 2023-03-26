import React, { useEffect, useState } from "react";
import style from "./Blogs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, setMyBlogs, clearBlogs } from "../store/blogsSlice";
import api from "../apis/api";
import { useNavigate } from "react-router-dom";
import { setEditor } from "../store/usersSlice";
import BlogsCard from "../components/BlogsCard";
import CreateModal from "../components/CreateModal";

const Blogs = () => {
  const editors = useSelector((state) => state.users.editors);
  const isEditor = useSelector((state) => state.users.isEditor);
  const allBlogs = useSelector((state) => state.blogs.allBlogs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMyBlogs, setShowMyBlogs] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal((prevState) => !prevState);
  };

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') == false) {
      navigate("/");
    }

    dispatch(clearBlogs());

    try {
      editors.map(async (user) => {
        const response = await api.get(`/users/${user}/posts`);
        dispatch(setBlogs(response.data));
      });
    } catch (error) {
      console.error(error);
    }

    let inArray = editors.find(
      (element) => element === +localStorage.getItem("id")
    );
    if (inArray) {
      dispatch(setEditor());

      try {
        (async () => {
          const response = await api.get(
            `/users/${localStorage.getItem("id")}/posts`
          );
          dispatch(setMyBlogs(response.data));
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, navigate, editors]);

  return (
    <div>
      <div className={style.bar}>
        <div className={style.name}>Welcome {localStorage.getItem("name")}</div>
        <button type="button" className={style.btnLogout} onClick={logout}>
          Logout
        </button>
      </div>

      {isEditor === true && (
        <div className={style.btnsForEditor}>
          {allBlogs.length > 0 ? (
            <div>
              <button
                type="button"
                className={showMyBlogs === false ? style.btnActive : style.btn}
                onClick={() => setShowMyBlogs(false)}
              >
                All Blogs
              </button>
              <button
                type="button"
                className={showMyBlogs === true ? style.btnActive : style.btn}
                onClick={() => setShowMyBlogs(true)}
              >
                My Blogs
              </button>
            </div>
          ) : <div>No Blog is posted yet</div>}

          <button
            type="button"
            className={style.btnCreate}
            onClick={handleShowModal}
          >
            Create
          </button>
        </div>
      )}

      <BlogsCard showMyBlogs={showMyBlogs} />
      {showModal && <CreateModal handleShowModal={handleShowModal} />}
    </div>
  );
};

export default Blogs;
