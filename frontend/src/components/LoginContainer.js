import { Link } from "react-router-dom";

function LoginContainer() {
    
    return (
            <form>
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
                <button id="login" type="submit">LOGIN</button>
                <Link id="non-registered-button" to="/register">
                    Not registered? Register now!
                </Link>
            </form>

    );
}

export default LoginContainer;