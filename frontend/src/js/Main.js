import Navigation from "../components/Navigation";
import '../css/main.css'

function Main(){
    return (
        <div className="base-container">
            <Navigation/>
            <section className="content">
                <h1>Welcome to GymPlaner!</h1>
            </section>
        </div>
    );
}
export default Main
