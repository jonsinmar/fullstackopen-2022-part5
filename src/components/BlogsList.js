import Blog from "./Blog";
const BlogsList = ({ blogs, likeBlog, removeBlog }) => {
  
  return (
    <>
      {blogs.sort((blogA,blogB)=>blogB.likes - blogA.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog}/>
      ))}
    </>
  );
};

export default BlogsList;
