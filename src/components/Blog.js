import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [showBlog, setShowBlog] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {showBlog ? (
        <>
          <button onClick={() => setShowBlog(false)}>hide</button>
          <div>
            <p>{blog.url}</p>
            <p>
              {blog.likes ? `${blog.likes} likes` : "0 likes"}{" "}
              <button onClick={() => likeBlog(blog)}>like</button>
            </p>
            <p>{blog?.name}</p>
          </div>
          <div>
            <button onClick={() => removeBlog(blog.id)}>remove</button>
          </div>
        </>
      ) : (
        <button onClick={() => setShowBlog(true)}>view</button>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
