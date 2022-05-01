import { useEffect, useState } from "react";
import BlogsList from "./components/BlogsList";
import CreateBlog from "./components/CreateBlog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: null, type: null });

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
    setUser(null);
  };

  const createNew = async (blog) => {
    try {
      const response = await blogService.createNew({ blog, token });
      setBlogs([...blogs, response]);
      setMessage({
        text: `a new blog ${blog.title} by ${blog.author} added`,
        type: "success",
      });
    } catch (error) {
      setMessage({ text: error.response.data.error, type: "error" });
    } finally {
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
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
      <CreateBlog createNew={createNew} />
      <BlogsList blogs={blogs} />
    </div>
  );
};

export default App;
