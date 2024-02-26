import Navigation from "../components/Navigation";
import '../css/main.css'
import {Link} from "react-router-dom";

function Main(){
    return (
        <div className="base-container">
            <Navigation/>
            <section className="content">
                <h1>Welcome to GymPlaner!</h1>
                <div className="information">
                <p>Wanna check other users plans? Go to <Link className="links" to={"/plans"}>plans</Link>
                    ! You can also create your new plan there.</p>
                <p>Are you looking for some exercises? Go to <Link className="links" to={"/exercises"}>exercises</Link>
                    ! If you find the one you need, you can add them to your plan!</p>
                <p>Interested in managing your own plans? Go to <Link className="links" to={"/user"}>user panel</Link>!</p>
                <p>I hope you will find everything you need. Good luck with your gym journey!</p>
                </div>
            </section>
        </div>
    );
}
export default Main
