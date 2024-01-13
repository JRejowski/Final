import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function LoginContainer() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate(); // Utworzenie instancji navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", formData);
            const jwtToken = response.data; // Otrzymujesz token JWT z serwera

            // Zapisz token w localStorage
            localStorage.setItem("jwtToken", jwtToken);

            // Przekierowanie do /home
            navigate("/home");

            console.log("Login successful");
        } catch (error) {
            console.error("Login failed:", error.response.data);
            // Obsługa błędu logowania
        }
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <input
                name="email"
                type="text"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                name="password"
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
            />
            <button id="loginButton" type="submit">LOGIN</button>
            <Link id="non-registered-button" to="/register">
                Not registered? Register now!
            </Link>
        </form>
    );
}

export default LoginContainer;
