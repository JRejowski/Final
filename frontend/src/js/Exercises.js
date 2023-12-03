import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import "../css/exercises.css"
import {Link} from "react-router-dom";

function Exercises() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/exercises',
                params: {
                    type: 'strength',
                    muscle: 'biceps',
                    difficulty: 'intermediate'
                },
                headers: {
                    'X-Api-Key': 'ClHcoK1sCkiGzDa70V3FHw==HNfiD4A6A5NcDXtv',
                }
            };

            try {
                const response = await axios.request(options);
                setExercises(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="base-container">
            <Navigation />
            <section className="content">
                <h1>Exercises</h1>
                <ul className="exercises-list">
                    {exercises.map((exercise, index) => (
                        <li key={index}>
                            <p><strong>Name:</strong><Link className='exercise-link' to={`/exercises/${exercise.name}`}>{exercise.name}</Link> </p>
                            <p><strong>Type:</strong> {exercise.type}</p>
                            <p><strong>Muscle:</strong> {exercise.muscle}</p>
                            <p><strong>Equipment:</strong> {exercise.equipment}</p>
                            <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Exercises;
