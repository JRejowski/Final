// UserPlans.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/userPlans.css';

function UserPlans() {
    const [userPlans, setUserPlans] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [newPlanName, setNewPlanName] = useState('');

    useEffect(() => {
        const fetchUserPlans = async () => {
            try {
                const userId = 1;
                const response = await fetch(`http://localhost:8080/api/plans/user/${userId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setUserPlans(data);
            } catch (error) {
                console.error('Error fetching user plans:', error);
            }
        };

        fetchUserPlans();
    }, []);

    const handleDeletePlan = (planId, planName) => {
        setSelectedPlan({ id: planId, name: planName });
        setShowDeleteModal(true);
    };

    const handleEditPlanName = (planId, currentName) => {
        setSelectedPlan({ id: planId, name: currentName });
        setNewPlanName(currentName); // Ustaw obecną nazwę jako placeholder
        setShowEditModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/plans/${selectedPlan.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setUserPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== selectedPlan.id));
        } catch (error) {
            console.error('Error deleting plan:', error);
        } finally {
            setShowDeleteModal(false);
            setSelectedPlan(null);
        }
    };

    const handleConfirmEdit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/plans/${selectedPlan.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newPlanName }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setUserPlans((prevPlans) =>
                prevPlans.map((plan) =>
                    plan.id === selectedPlan.id ? { ...plan, name: newPlanName } : plan
                )
            );
        } catch (error) {
            console.error('Error updating plan name:', error);
        } finally {
            setShowEditModal(false);
            setSelectedPlan(null);
            setNewPlanName(''); // Resetuj wartość po zamknięciu modala
        }
    };

    return (
        <div className="base-container">
            <Navigation />
            <section className="content">
                <h1 className='my-plans'>My plans</h1>
                <ul className='plan-list'>
                    {userPlans.map((plan) => (
                        <li key={plan.id} className='plan-list-item'>
                            <Link to={`/plan/${plan.id}`}>{plan.name}</Link>
                            <div className="icons-container">
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    onClick={() => handleEditPlanName(plan.id, plan.name)}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => handleDeletePlan(plan.id, plan.name)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Delete Plan Modal */}
            <div className={`modal-overlay ${showDeleteModal ? 'active' : ''}`}>
                <div className="modal-content">
                    <p>Do you really want to delete the plan "{selectedPlan?.name}"?</p>
                    <button className="button button-secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </button>
                    <button className="button button-danger" onClick={handleConfirmDelete}>
                        Delete
                    </button>
                </div>
            </div>

            {/* Edit Plan Modal */}
            <div className={`modal-overlay ${showEditModal ? 'active' : ''}`}>
                <div className="modal-content">
                    <p>Current name: {selectedPlan?.name}</p>
                    <input
                        type="text"
                        placeholder={`Enter new plan name (${selectedPlan?.name})`}
                        value={newPlanName}
                        onChange={(e) => setNewPlanName(e.target.value)}
                    />
                    <button className="button button-secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </button>
                    <button className="button button-primary" onClick={handleConfirmEdit}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserPlans;
