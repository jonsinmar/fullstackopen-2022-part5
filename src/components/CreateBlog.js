const CreateBlog = ({ blog, setBlog, createNew }) => {
  return (
    <>
      <div>
        <h2>create new</h2>
        <div className="blogForm">
          <span>
            {" "}
            title:{" "}
            <input
            type="text"
            value={blog.title}
              onChange={(event) =>
                setBlog({ ...blog, title: event.target.value })
              }
            />
          </span>
          <span>
            author:{" "}
            <input
            type="text"
            value={blog.author}
              onChange={(event) =>
                setBlog({ ...blog, author: event.target.value })
              }
            />
          </span>
          <span>
            url:{" "}
            <input
            type="text"
            value={blog.url}
              onChange={(event) =>
                setBlog({ ...blog, url: event.target.value })
              }
            />
          </span>
          <span>
            <button onClick={() => createNew(blog)}>create</button>
          </span>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
