// axios
import axios from 'axios'
const baseURL = 'http://localhost:3000'
const instance = axios.create({
  baseURL,
})
instance.interceptors.request.use(async (config) => {
  return config
})

export default instance
