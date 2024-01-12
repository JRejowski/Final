import RegisterContainer from "../components/RegisterContainer";
import '../css/register.css'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDumbbell} from "@fortawesome/free-solid-svg-icons";

function Register(){
    return (
        <div className="container">
            <div className="name-main">
                <Link to="/"><FontAwesomeIcon icon={faDumbbell} className="logo-big"/></Link>
                <Link className="link-big" to="/login">GymPlaner</Link>
            </div>
            <RegisterContainer/>
        </div>
    );
}

export default Register
