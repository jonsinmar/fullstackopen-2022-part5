import { useEffect, useState } from "react";
import BlogsList from "./components/BlogsList";
import CreateBlog from "./components/CreateBlog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: null, type: null });
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [createBlogVisible, setCreateBlogVisible] = useState(false);

  useEffect(() => {
    const getAll = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
    };
    if (token) {
      getAll();
    }
  }, [token]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
      loginService.setToken(user.token);
    }
  }, []);

  const doLogin = async (user) => {
    try {
      const response = await loginService.login(user);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(response));
      setToken(response.token);
      loginService.setToken(user.token);
      setUser(response);
    } catch (error) {
      setMessage({ text: error.response.data.error, type: "error" });
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
    }
  };

  const doLogout = () => {
    localStorage.removeItem("loggedBlogUser");
    setToken(null);
    loginService.setToken(null);
    setUser(null);
  };

  const createNew = async (blog) => {
    try {
      const response = await blogService.createNew({ blog });
      setBlogs([...blogs, response]);
      setMessage({
        text: `a new blog ${blog.title} by ${blog.author} added`,
        type: "success",
      });
      setCreateBlogVisible(false);
      setBlog({
        title: "",
        author: "",
        url: "",
      });
    } catch (error) {
      setMessage({ text: error.response.data.error, type: "error" });
    } finally {
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
    }
  };

  const likeBlog = async (blog) => {
    try {
      blog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
      const responseBlog = await blogService.updateBlog({ blog });
      const newBlogs = blogs.map((stateBlog) => {
        if (responseBlog.id === stateBlog.id) {
          return responseBlog;
        }
        return stateBlog;
      });
      setBlogs(newBlogs);

      setMessage({
        text: `blog ${blog.title} updated`,
        type: "success",
      });
      setCreateBlogVisible(false);
    } catch (error) {
      setMessage({ text: error.response.data.error, type: "error" });
    } finally {
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
    }
  };

  const removeBlog = async (id) => {
    const confirm = window.confirm(
      `Remove blog ${blogs.find((blog) => blog.id === id).title} by ${
        blogs.find((blog) => blog.id === id).author
      }?`
    );
    if (confirm) {
      try {
        await blogService.removeBlog(id);
        setMessage({
          text: "blog removed",
          type: "success",
        });
        const newBlogs = blogs.filter((stateBlog) => stateBlog.id !== id);
        setBlogs(newBlogs);
      } catch (e) {
        setMessage({ text: e.response.data.error, type: "error" });
      } finally {
        setTimeout(() => {
          setMessage({ text: null, type: null });
        }, 5000);
      }
    }
  };

  if (!token) {
    return <Login doLogin={doLogin} message={message} />;
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.text} type={message.type} />
      <span>{user.username} logged in</span>{" "}
      <button onClick={() => doLogout()}>logout</button>
      <Togglable
        buttonLabel={"new note"}
        createBlogVisible={createBlogVisible}
        setCreateBlogVisible={setCreateBlogVisible}
      >
        <CreateBlog
          blog={blog}
          setBlog={setBlog}
          createNew={createNew}
          createBlogVisible={createBlogVisible}
          setCreateBlogVisible={setCreateBlogVisible}
        />
      </Togglable>
      <BlogsList blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} />
    </div>
  );
};

export default App;
