import axios from 'axios';
import { baseUrl } from './urls';

const token = localStorage.getItem('access_token') || false;

export default axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `${token}` }
});
