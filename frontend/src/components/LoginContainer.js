import { Link } from "react-router-dom";
import '../css/login.css'

function LoginContainer() {

    return (

            <form className="login">
                <input
                    name="email"
                    type="text"
                    placeholder="email"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                />
                <button id="loginButton" type="submit">LOGIN</button>
                <Link id="non-registered-button" to="/register">
                    Not registered? Register now!
                </Link>
            </form>

    );
}

export default LoginContainer;
