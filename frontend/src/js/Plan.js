import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../css/plan.css'

function Plan() {
    const [planDetails, setPlanDetails] = useState([]);
    const [plan, setPlan] = useState({});
    const { planId } = useParams();

    useEffect(() => {
        const fetchPlanData = async () => {
            try {
                // Fetch plan details for a specific planId
                const detailsResponse = await fetch(`http://localhost:8080/api/plan-details/plan/${planId}`);
                if (!detailsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${detailsResponse.status}`);
                }
                const detailsData = await detailsResponse.json();
                setPlanDetails(detailsData);

                // Fetch plan info for the same planId
                const infoResponse = await fetch(`http://localhost:8080/api/plans/${planId}`);
                if (!infoResponse.ok) {
                    throw new Error(`HTTP error! Status: ${infoResponse.status}`);
                }
                const planInfo = await infoResponse.json();
                setPlan(planInfo);
            } catch (error) {
                console.error('Error fetching plan details:', error);
            }
        };

        if (planId) {
            fetchPlanData();
        } else {
            console.error('Plan ID is undefined');
        }
    }, [planId]);

    return (
        <div className="base-container">
            <Navigation />
            <div className="content">
                <div>
                    <h1 className='plan-name'>{plan.name}</h1>
                    <table className='plan-table'>
                        <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Rest</th>
                        </tr>
                        </thead>
                        <tbody>
                        {planDetails.map((detail) => (
                            <tr key={detail.id}>
                                <td>
                                    <Link className='link-to-exercise' to={`/exercises/${detail.exerciseName}`}>
                                        {detail.exerciseName}
                                    </Link>
                                </td>
                                <td>{detail.sets}</td>
                                <td>{detail.reps}</td>
                                <td>{detail.rest}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Plan;
