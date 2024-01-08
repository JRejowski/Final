import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from "../components/Navigation";
import { useParams } from 'react-router-dom';
import '../css/exercise.css';
import {Button, Form, Modal} from "react-bootstrap";

function Exercise() {
    const { name } = useParams();
    const [exerciseDetails, setExerciseDetails] = useState(null);
    const [userPlans, setUserPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [rest, setRest] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            if (!name) {
                console.error('Exercise name not provided. Name:', name);
                return;
            }

            const encodedExerciseName = encodeURIComponent(name);
            const options = {
                method: 'GET',
                url: `https://api.api-ninjas.com/v1/exercises?name=${encodedExerciseName}`,
                headers: {
                    'X-Api-Key': 'ClHcoK1sCkiGzDa70V3FHw==HNfiD4A6A5NcDXtv',
                }
            };

            try {
                const response = await axios.request(options);
                console.log('Response from API:', response.data);

                if (response.data.length > 0) {
                    // Jeśli są dane, ustaw pierwszy element jako szczegóły ćwiczenia
                    setExerciseDetails(response.data[0]);
                } else {
                    console.error('No exercise details found for:', name);
                }
            } catch (error) {
                console.error('Error fetching exercise details:', error);
            }
        };
        const fetchUserPlans = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/plans/user/1`);
                setUserPlans(response.data);
            } catch (error) {
                console.error('Error fetching user plans:', error);
            }
        };

        fetchExerciseDetails();
        fetchUserPlans();
    }, [name]);

    const handlePlanChange = (event) => {
        const selectedPlanId = event.target.value;
        setSelectedPlan(selectedPlanId);
    };

    const handleSetsChange = (e) => {
        setSets(e.target.value);
    };

    const handleRepsChange = (e) => {
        setReps(e.target.value);
    };

    const handleRestChange = (e) => {
        setRest(e.target.value);
    };

    const openModal = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden'; // Dodaj overflow: hidden, aby uniemożliwić przewijanie strony pod modalem
    };

    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = 'auto'; // Przywróć overflow: auto po zamknięciu modala
    };

    const addExerciseToSelectedPlan = async () => {

        if (!selectedPlan) {
            console.error('No plan selected.');
            return;
        }

        console.log('Selected Plan:', selectedPlan);

        const exerciseName = exerciseDetails.name;
        const planId =selectedPlan;


        try {
            // Wyślij dane szczegółów planu do backendu
            const response = await axios.post('http://localhost:8080/api/plan-details', {
                plan: {id: planId,},
                exerciseName,
                reps,
                sets,
                rest,
            });

            console.log('Exercise added to plan:', response.data);
            // Zamknij modal po dodaniu ćwiczenia do planu
            setShowModal(false);
        } catch (error) {
            console.error('Error adding exercise to plan:', error);
        }
    };


    if (!exerciseDetails) {
        return <p>Loading...</p>;
    }
    //TODO jak nie jesteś zalogowany to button do dodawania sie nie wyświetla
    return (
        <div className="base-container">
            <Navigation />
            <div className='exercise-details'>
                <h2>{exerciseDetails.name}</h2>
                <p><strong>Instructions:</strong> <br/> {exerciseDetails.instructions}</p>
                <p><strong>Type:</strong> <br/>  {exerciseDetails.type}</p>
                <p><strong>Muscle:</strong> <br/>  {exerciseDetails.muscle}</p>
                <p><strong>Equipment:</strong> <br/>  {exerciseDetails.equipment}</p>
                <p><strong>Difficulty:</strong> <br/>  {exerciseDetails.difficulty}</p>
                <div className="add-to-plan-button">
                    <button onClick={openModal}>Add this exercise to your plan</button>
                </div>
            </div>

            {/* Overlay */}
            <div className={`modal-overlay ${showModal ? 'active' : ''}`} />


            {/* Modal for adding exercise to plan */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Exercise to Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Select Plan:</Form.Label>
                            <select onChange={handlePlanChange} value={selectedPlan}>
                                <option value="" disabled>Select a Plan</option>
                                {userPlans.map((plan) => (
                                    <option key={plan.id} value={plan.id}>
                                        {plan.name}
                                    </option>
                                ))}
                            </select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Sets:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter number of sets"
                                value={sets}
                                onChange={handleSetsChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Reps:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter number of reps"
                                value={reps}
                                onChange={handleRepsChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Rest:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter rest time"
                                value={rest}
                                onChange={handleRestChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addExerciseToSelectedPlan}>
                        Add to Selected Plans
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Exercise;
