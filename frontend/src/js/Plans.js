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
                <PlanComponent name={"Bicep Day"} creator={"Tom"}></PlanComponent>
                <PlanComponent name={"What a plan!"} creator={"Jack"}></PlanComponent>
                <PlanComponent name={"8h arm workout"} creator={"Rich"}></PlanComponent>
                <PlanComponent name={"Push pull skip"} creator={"Krzys"}></PlanComponent>
                <PlanComponent name={"Zumba with roomba"} creator={"EltonJohn420"} ></PlanComponent>
                <PlanComponent name={"Fighting with demons"} creator={"CrazyLifter69"}></PlanComponent>+

            </section>
            </div>
        </div>
    )

}

export default Plans
