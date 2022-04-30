import { useEffect, useState } from "react";
import BlogsList from "./components/BlogsList";
import CreateBlog from "./components/CreateBlog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(undefined);
  const [user,setUser]=useState(null);
  

  useEffect(() => {
    const getAll = async ()=>{
      const response = await blogService.getAll()
      setBlogs(response)
    }
    if(token){
      getAll();
    }
  }, [token]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user);
      setToken(user.token);
      loginService.setToken(user.token)
    }
  }, [])

  const doLogin = async (user)=>{
    const response = await loginService.login(user);
    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify(response)
    ) 
    setToken(response.token)
    setUser(response);
  }

  const doLogout = ()=>{
    localStorage.removeItem('loggedBlogUser')
    setToken(null);
    setUser(null)
  }

  const createNew = async (blog)=>{
    const response = await blogService.createNew({blog, token});
    setBlogs([...blogs,response])
  }

  if (!token) {
    return <Login doLogin={doLogin}/>;
  }
  return (
    <div>
      <h2>blogs</h2>
      <CreateBlog createNew={createNew}/>
      <span>{user.username} logged in</span> <button onClick={()=>doLogout()}>logout</button>
      <BlogsList blogs={blogs}/>
    </div>
  );
};

export default App;
