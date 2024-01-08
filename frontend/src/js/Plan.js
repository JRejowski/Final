// Plan.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../css/plan.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import '../css/modals.css';

function Plan() {
    const [planDetails, setPlanDetails] = useState([]);
    const [plan, setPlan] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDetailId, setSelectedDetailId] = useState(null);

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

    const handleEditClick = (detailId) => {
        // Open the edit modal and set the selected detail ID
        setEditModalOpen(true);
        setSelectedDetailId(detailId);
    };

    const handleDeleteClick = (detailId) => {
        // Open the delete modal and set the selected detail ID
        setDeleteModalOpen(true);
        setSelectedDetailId(detailId);
    };

    const handleUpdateDetails = (updatedDetails) => {
        // Update the details for the selected ID
        const updatedPlanDetails = planDetails.map(detail =>
            detail.id === selectedDetailId
                ? { ...detail, ...updatedDetails }
                : detail
        );

        setPlanDetails(updatedPlanDetails);
        // Close the edit modal
        setEditModalOpen(false);
    };

    const handleDeleteDetails = (deletedDetailId) => {
        // Remove the details for the selected ID
        const updatedPlanDetails = planDetails.filter(detail => detail.id !== deletedDetailId);
        setPlanDetails(updatedPlanDetails);
        // Close the delete modal
        setDeleteModalOpen(false);
    };

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
                            <th>Edit</th>
                            <th>Delete</th>
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
                                <td className='controls' onClick={() => handleEditClick(detail.id)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </td>
                                <td className='controls' onClick={() => handleDeleteClick(detail.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editModalOpen && (
                <div className="modal-overlay active">
                    <EditModal
                        isOpen={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        onUpdateDetails={handleUpdateDetails}
                        selectedDetailId={selectedDetailId}
                    />
                </div>
            )}

            {deleteModalOpen && (
                <div className="modal-overlay active">
                    <DeleteModal
                        isOpen={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        onDeleteDetails={handleDeleteDetails}
                        selectedDetailId={selectedDetailId}
                    />
                </div>
            )}
        </div>
    );
}

export default Plan;
