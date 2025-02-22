import axios from "axios"
import { ACCESS_TOKEN } from "./constant"

// Defining the Base URL path
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Calling path using the interceptor (axios) to make request
api.interceptors.request.use(
    (config) => {
        // Storing the token in localstorage and used in other requests 
        const token =  localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization =  `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api