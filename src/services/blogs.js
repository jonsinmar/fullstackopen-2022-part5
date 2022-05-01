import axios from "axios";
import loginService from "./login";

const baseUrl = "/api/blogs";

const getHeaders = () => ({
  headers: { Authorization: `bearer ${loginService.getToken()}` },
});

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async ({ blog }) => {
  const response = await axios.post(baseUrl, blog, getHeaders());
  return response.data;
};

const updateBlog = async ({ blog }) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getHeaders());
  return response.data;
};

const removeBlog = async (id) => {
  console.log(id);
  const response = await axios.delete(`${baseUrl}/${id}`, getHeaders());
  return response.data;
};

const blogService = { getAll, createNew, updateBlog, removeBlog };

export default blogService;
