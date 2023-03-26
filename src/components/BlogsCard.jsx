import { useSelector } from "react-redux";
import Blog from "./Blog";
import style from './BlogsCard.module.css'

const BlogsCard = ({ showMyBlogs }) => {
  const blogs = useSelector((state) => (showMyBlogs === true) ? state.blogs.myBlogs : state.blogs.allBlogs);
  return (
    <div className={style.blogsCard}>
      {blogs.length > 0 ?
        blogs.map((blog, index) => <Blog key={index} blog={blog} showMyBlogs={showMyBlogs}/>) : <div className={style.noBlog}>No Blog is Posted yet</div>}
    </div>
  );
};

export default BlogsCard;
