import axios from 'axios';
import { port } from 'src/main';

const local = 'http://localhost:' + port;

const production = 'https://project-blue-nest.onrender.com';

export const api = axios.create({
  baseURL: !process.env.PORT ? local : production,
});
