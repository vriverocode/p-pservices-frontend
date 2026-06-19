import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const backendUrl = process.env.API_BASE_URL;

const api = axios.create({
  baseURL: `${backendUrl}/api`,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

const webApi = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    'Accept': 'application/json'
  }
});

export default defineBoot(() => {
  // Vacío intencionalmente. 
  // No inyectamos globalProperties porque usamos Composition API estricto.
});

export { api, webApi }