import { Link} from "react-router-dom";

function RegisterContainer() {


    return (

            <form className="register" >
                <input
                    name="login"
                    type="text"
                    placeholder="login"
                />
                <input
                    name="email"
                    type="text"
                    placeholder="email@example.com"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                />
                <input
                    name="repeatPassword"
                    type="password"
                    placeholder="repeat password"
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
