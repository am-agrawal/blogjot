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

  const allBlogs = useSelector(state => state.blogs.allBlogs);
  const myBlogs = useSelector(state => state.blogs.myBlogs);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMyBlogs, setShowMyBlogs] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if(searchText.trim() !== '') {
      let result = (showMyBlogs === true ? myBlogs : allBlogs).map(blog => {
        if(blog.title.search(searchText) !== -1) {
          return blog;
        }
        return null;
      })
      result = result.filter(blog => blog !== null);
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
    if (localStorage.getItem("isLoggedIn") == false) {
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
            Create
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
            placeholder="&#128269; Search"
            className={style.search}
          />
        </div>
      </div>

      {showSearchResults === false ? <BlogsCard showMyBlogs={showMyBlogs} /> : <SearchResult blogs={searchResult} />}
      {showModal && <CreateModal handleShowModal={handleShowModal} />}
    </div>
  );
};

export default Blogs;
