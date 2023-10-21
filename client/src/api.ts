import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const httpRequest = axios.create({ baseURL: SERVER_URL });