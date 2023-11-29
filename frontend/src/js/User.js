import Navigation from "../components/Navigation";
import "../css/user.css"
import {Link} from "react-router-dom";

function User(){
    return (
        <div className="base-container">
            <Navigation/>
            <section className="content-user">
                <h1>User panel</h1>
                <div className="user-buttons">
                    <Link className="user-button" to="/user-plans">My plans</Link>
                    <Link className="user-button" to="/user-settings">Settings</Link>
                    <Link className="user-button" to="/login">Logout</Link>
                </div>
            </section>
        </div>
    )
}
export default User
