import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogsCard = ({ showMyBlogs }) => {
  const blogs = useSelector((state) => (showMyBlogs === true) ? state.blogs.myBlogs : state.blogs.allBlogs);
  return (
    <div>
      {blogs.length > 0 &&
        blogs.map((blog, index) => <Blog key={index} blog={blog} showMyBlogs={showMyBlogs}/>)}
    </div>
  );
};

export default BlogsCard;
