import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClipboard,
    faDumbbell,
    faUser,
    faWeightHanging
} from '@fortawesome/free-solid-svg-icons';
import "../css/navigation.css"
import {Link} from "react-router-dom";

function Navigation() {

    return(
    <div className="base">
        <div className="name">
            <Link to="/"><FontAwesomeIcon icon={faDumbbell} className="logo"/></Link>
            <Link className="link" to="/">GymPlaner</Link>
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
                <Link className="button" to="/user">User</Link>
            </li>

        </ul>
    </div>
    )
}

export default Navigation
