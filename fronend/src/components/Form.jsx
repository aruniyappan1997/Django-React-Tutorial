import react, { cache } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant"
import { useState } from "react"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"

function Form({route, method}) {
    // Here Above route, method are the props (In python arguments for a function)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate('/')
            } else {
                navigate('/login/')
            }
        } catch (error) {
            console.error(error)
            // alert(error)
            if (error.response) {
                if (error.response.status == 401) {
                    alert("You are not authorized to view this page")
                } else if (error.response.status == 500) {
                    alert("Internal Server Error")
                } else {
                    alert("Something went wrong")
                }
            } else {
                alert("Network Error or Server is down")
            }

        } finally{
            setLoading(false)
        }

    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input 
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form;