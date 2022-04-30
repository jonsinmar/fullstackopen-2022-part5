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
      <div>
        title: <input onChange={(event)=>setBlog({...blog, title: event.target.value})}/>
        author: <input onChange={(event)=>setBlog({...blog, author: event.target.value})}/>
        url: <input onChange={(event)=>setBlog({...blog, url: event.target.value})}/>
        <button onClick={()=>createNew(blog)}>create</button>
      </div>
    </>
  );
};

export default CreateBlog;
