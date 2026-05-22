import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

// Obtenemos la URL desde el .env
const backendUrl = process.env.API_BASE_URL;

// Instancia principal para tu API de negocio
const api = axios.create({
  baseURL: `${backendUrl}/api`,
  withCredentials: true, // CRÍTICO para Sanctum (Cookies SPA)
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

// Instancia limpia para peticiones fuera de /api (ej: pedir el token CSRF)
const webApi = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    'Accept': 'application/json'
  }
})

export default defineBoot(({ app }) => {
  // Para usar dentro de componentes Vue en el template (Options API)
  // Ej: this.$axios o this.$api
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

// Las exportamos para poder importarlas directamente en los stores de Pinia
export { api, webApi }