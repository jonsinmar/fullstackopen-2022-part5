import axios from 'axios'
const baseUrl = '/api/login'

let token = null

const setToken = newToken => {
  token = `${newToken}`
}

const getToken = ()=>token;

const login = async (user) => {
  const response = await axios.post(baseUrl, user)
  
  return response.data;
}

const loginService = {login, setToken, getToken}
export default loginService