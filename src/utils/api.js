import axios from 'axios';
import { baseURL } from './url';

const token = localStorage.getItem('access_token') || false;

export default axios.create({
  baseURL,
  headers: { Authorization: `${token}` }
});
