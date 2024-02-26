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
import {jwtDecode} from "jwt-decode";

function Plan() {
    const [planDetails, setPlanDetails] = useState([]);
    const [plan, setPlan] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDetailId, setSelectedDetailId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [planCreator, setPlanCreator] = useState(null);
    const { planId } = useParams();


    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.userId); // Ustaw userId w stanie
        }
        const fetchPlanData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('No token found');
                }

                // Dodaj nagłówek Authorization z tokenem JWT do żądania
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                const detailsResponse = await fetch(`http://localhost:8080/api/plan-details/plan/${planId}`, { headers });
                if (!detailsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${detailsResponse.status}`);
                }
                const detailsData = await detailsResponse.json();
                setPlanDetails(detailsData);

                const infoResponse = await fetch(`http://localhost:8080/api/plans/${planId}`, { headers });
                if (!infoResponse.ok) {
                    throw new Error(`HTTP error! Status: ${infoResponse.status}`);
                }
                const planInfo = await infoResponse.json();
                setPlan(planInfo);
                setPlanCreator(planInfo.createdBy.id)
            } catch (error) {

            }
        };

        if (planId) {
            fetchPlanData();
        } else {

        }
    }, [planId]);

    const handleEditClick = (detailId) => {
        setEditModalOpen(true);
        setSelectedDetailId(detailId);
    };

    const handleDeleteClick = (detailId) => {
        setDeleteModalOpen(true);
        setSelectedDetailId(detailId);
    };

    const handleUpdateDetails = (updatedDetails) => {
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

    const isCreatedByCurrentUser = planCreator === userId;

    return (
        <div className="base-container">
            <Navigation />
            <div className="content">
                {planDetails.length === 0 ? (
                    <p className="nothing-to-show">Nothing here. Go to Exercises to add some to your plan!</p>
                ) : (
                    <div>
                        <h1 className='plan-name'>{plan.name}</h1>
                        <table className='plan-table'>
                            <thead>
                            <tr>
                                <th>Exercise</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Rest</th>
                                {isCreatedByCurrentUser && <th>Edit</th>}
                                {isCreatedByCurrentUser && <th>Delete</th>}
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
                                    {isCreatedByCurrentUser && (
                                        <>
                                            <td className='controls' onClick={() => handleEditClick(detail.id)}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </td>
                                            <td className='controls' onClick={() => handleDeleteClick(detail.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
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
