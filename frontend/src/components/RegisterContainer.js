import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterContainer() {
    const [formData, setFormData] = useState({
        login: "",
        email: "",
        password: "",
        repeatPassword: ""
    });

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
            const response = await axios.post("http://localhost:8080/api/auth/register", formData);
            console.log("Registration successful:", response.data);
            // Tutaj możesz przekierować użytkownika na inną stronę po udanej rejestracji
        } catch (error) {
            console.error("Registration failed:", error.response.data);
            // Tutaj możesz obsłużyć błąd rejestracji, np. wyświetlić komunikat użytkownikowi
        }
    };

    return (
        <form className="register" onSubmit={handleSubmit}>
            <input
                name="login"
                type="text"
                placeholder="login"
                value={formData.login}
                onChange={handleChange}
            />
            <input
                name="email"
                type="text"
                placeholder="email@example.com"
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
            <input
                name="repeatPassword"
                type="password"
                placeholder="repeat password"
                value={formData.repeatPassword}
                onChange={handleChange}
            />
            <button id="registerButton" type="submit">
                REGISTER
            </button>
            <Link id="non-registered-button" to="/login">
                Already registered? Log in!
            </Link>
        </form>
    );
}

export default RegisterContainer;
