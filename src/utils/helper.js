import axios from "axios";

// // for local test
// export const baseURL = axios.defaults.baseURL = 'http://localhost:3000/';
// // FOR PRODUCTION
const baseURL = axios.defaults.baseURL = 'https://bqla-tehnika3.azurewebsites.net/';

export const BASE_API_URL = `${baseURL}`
export const configUrlEncoded = {
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
}
// export const configFormData = {
//   headers: {
//     "content-type": "multipart/form-data",
//     "Access-Control-Allow-Origin": "*",
//   },
// }

axios.defaults.headers.get['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.put['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = baseURL;
