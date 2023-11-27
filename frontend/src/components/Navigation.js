import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClipboard,
    faDumbbell,
    faSignOutAlt,
    faUser,
    faWeightHanging
} from '@fortawesome/free-solid-svg-icons';
import "../css/navigation.css"
import {Link} from "react-router-dom";

function Navigation() {

    return(
    <div className="base">
        <div className="name">
        <FontAwesomeIcon icon={faDumbbell} className="logo"/>
        <h1>GymPlaner</h1>
        </div>
        <ul>
            <li>
                <FontAwesomeIcon icon={faClipboard} className="icon" />
                <Link className="button" to="/plans">Plans</Link>
            </li>
            <li>
                <FontAwesomeIcon icon={faWeightHanging} className="icon" />
                <Link className="button" to="/exercises">Exercises</Link>
            </li>
            <li>
                <FontAwesomeIcon icon={faUser} className="icon" />
                <Link className="button" to="/settings">User</Link>
            </li>
            <li>
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                <Link className="button" to="/login">Logout</Link>
            </li>
        </ul>
    </div>
    )
}

export default Navigation
