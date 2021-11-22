import Axios from "axios";

export const HttpNodeService = Axios.create({
  baseURL: `https://my-json-server.typicode.com/`,
});
