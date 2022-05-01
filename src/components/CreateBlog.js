import { useState } from "react";

const CreateBlog = ({createNew}) => {
  const [blog, setBlog] = useState({
    title: null,
    author: null,
    url: null,
  });

  return (
    <>
      <h2>create new</h2>
      <div className="blogForm">
       <span> title: <input onChange={(event)=>setBlog({...blog, title: event.target.value})}/></span>
        <span>author: <input onChange={(event)=>setBlog({...blog, author: event.target.value})}/></span>
        <span>url: <input onChange={(event)=>setBlog({...blog, url: event.target.value})}/></span>
        <span><button onClick={()=>createNew(blog)}>create</button></span>
      </div>
    </>
  );
};

export default CreateBlog;
