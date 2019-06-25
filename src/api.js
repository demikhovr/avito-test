import axios from 'axios';

const BASE_URL = 'https://avito.dump.academy/';
const TIMEOUT = 5000;

export default axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});
