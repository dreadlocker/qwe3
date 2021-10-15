import axios from "axios";

const baseURL = axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.defaults.headers.get['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.put['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = baseURL;

export const BASE_API_URL = `${baseURL}/api/`