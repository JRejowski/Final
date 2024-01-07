// Plans.js
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import PlanComponent from '../components/PlanComponent';
import '../css/plans.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

function Plans() {
    const [plans, setPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPlanName, setNewPlanName] = useState('');
    const [isPublic, setIsPublic] = useState('');

    useEffect(() => {
        // Fetch plans from the API
        fetch('http://localhost:8080/api/plans')
            .then((response) => response.json())
            .then((data) => setPlans(data))
            .catch((error) => console.error('Error fetching plans:', error));
    }, []);

    const handleCreatePlan = () => {
        const currentUser = {
            id: 1,
            login: 'qwe',
            //TODO: Tu pobieranie info o użytkowniku z cache czy coś
        };
        const newPlan = {
            name: newPlanName,
            public: isPublic,
            createdBy: currentUser,
        };

        fetch('http://localhost:8080/api/plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlan),
        })
            .then((response) => response.json())
            .then((createdPlan) => {
                // Dodaj nowo utworzony plan do stanu plans
                setPlans([...plans, createdPlan]);
                // Zamknij modal po utworzeniu planu
                setShowModal(false);
            })
            .catch((error) => console.error('Error creating plan:', error));
    };

    return (
        <div className="base-container">
            <Navigation />
            <div className="content">
                <div className="top">
                    <h1>Plans</h1>
                    <div className="new-plan" onClick={() => setShowModal(true)}>
                        <h2>Create new plan</h2>
                        <FontAwesomeIcon icon={faClipboard} className="icon-clipboard" />
                    </div>
                </div>
                <section className="plans">
                    {plans && plans.length > 0 ? (
                        plans
                            .filter((plan) => plan.public)
                            .map((plan) => (
                                <PlanComponent
                                    key={plan.id}
                                    id={plan.id}
                                    name={plan.name}
                                    creator={plan.createdBy.login}
                                ></PlanComponent>
                            ))
                    ) : (
                        <p>No public plans available.</p>
                    )}
                </section>
            </div>

            {/* Overlay */}
            <div className={`modal-overlay ${showModal ? 'active' : ''}`} />

            {/* Bootstrap Modal for creating new plans */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create New Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPlanName">
                            <Form.Label>Plan Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter plan name"
                                value={newPlanName}
                                onChange={(e) => setNewPlanName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formIsPublic">
                            <Form.Check
                                type="checkbox"
                                label="Public"
                                checked={isPublic}
                                onChange={() => setIsPublic(!isPublic)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCreatePlan}>
                        Create Plan
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Plans;
