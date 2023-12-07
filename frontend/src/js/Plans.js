import Navigation from "../components/Navigation";
import PlanComponent from "../components/PlanComponent";
import "../css/plans.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard} from "@fortawesome/free-solid-svg-icons";

function Plans() {

    return(
        <div className="base-container">
            <Navigation/>
            <div className="content">
                <div className="top">
                <h1>Plans</h1>
                    <div className="new-plan">
                        <h2>Create new plan</h2>
                        <FontAwesomeIcon icon={faClipboard} className="icon-clipboard"/>
                    </div>
                </div>
            <section className="plans">
                <PlanComponent name={"Bicep Day"} creator={"Tom"} likes={12} dislikes={15}></PlanComponent>
                <PlanComponent name={"What a plan!"} creator={"Jack"} likes={24} dislikes={30}></PlanComponent>
                <PlanComponent name={"8h arm workout"} creator={"Rich"} likes={48} dislikes={60}></PlanComponent>
                <PlanComponent name={"Push pull skip"} creator={"Krzys"} likes={96} dislikes={120}></PlanComponent>
                <PlanComponent name={"Zumba with roomba"} creator={"EltonJohn420"} likes={192} dislikes={240}></PlanComponent>
                <PlanComponent name={"Fighting with demons"} creator={"CrazyLifter69"} likes={384} dislikes={480}></PlanComponent>+

            </section>
            </div>
        </div>
    )

}

export default Plans
