import axios from "axios";

const request = axios.create({
  baseURL:"https://6528caa6931d71583df2745b.mockapi.io/" ,
  timeout:10000
})

export default request