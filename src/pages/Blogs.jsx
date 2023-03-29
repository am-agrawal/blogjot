import React, { useEffect, useState } from "react";
import style from "./Blogs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, setMyBlogs, clearBlogs } from "../store/blogsSlice";
import api from "../apis/api";
import { useNavigate } from "react-router-dom";
import { setEditor, resetEditor } from "../store/usersSlice";
import BlogsCard from "../components/BlogsCard";
import CreateModal from "../components/CreateModal";
import SearchResult from "../components/SearchResult";

const Blogs = () => {
  const editors = useSelector((state) => state.users.editors);
  const isEditor = useSelector((state) => state.users.isEditor);

  const allBlogs = useSelector((state) => state.blogs.allBlogs);
  const myBlogs = useSelector((state) => state.blogs.myBlogs);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMyBlogs, setShowMyBlogs] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (searchText.trim() !== "") {
      let result = (showMyBlogs === true ? myBlogs : allBlogs).map((blog) => {
        if (blog.title.search(searchText) !== -1) {
          return blog;
        }
        return null;
      });
      result = result.filter((blog) => blog !== null);
      setSearchResult(result);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    dispatch(resetEditor());
    navigate("/", { replace: true });
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal((prevState) => !prevState);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === false) {
      navigate("/", { replace: true });
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
        <h2>BlogJot</h2>
        <button type="button" className={style.btnLogout} onClick={logout}>
          Logout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
        </button>
      </div>
      <div className={style.bar}>
        <div className={style.name}>Welcome {localStorage.getItem("name")}</div>
        {isEditor === true && (
          <button
            type="button"
            className={style.btnCreate}
            onClick={handleShowModal}
          >
            New
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        )}
      </div>
      <div className={style.btnsForEditor}>
        {isEditor === true && (
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
        )}
        <div className={style.searchBox}>
          <input
            type="text"
            onChange={handleSearch}
            value={searchText}
            placeholder="Search"
            className={style.search}
          />
        </div>
      </div>

      {showSearchResults === false ? (
        <BlogsCard showMyBlogs={showMyBlogs} />
      ) : (
        <SearchResult blogs={searchResult} />
      )}
      {showModal && <CreateModal handleShowModal={handleShowModal} />}
    </div>
  );
};

export default Blogs;
