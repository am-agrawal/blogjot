import axios from "axios";

const instance = axios.create({ baseURL: 'https://gorest.co.in/public/v2' });
instance.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_API_KEY}`;
instance.defaults.headers.post['Content-Type'] = 'multipart/form-date';

export default instance;