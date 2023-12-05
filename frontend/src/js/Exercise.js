import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from "../components/Navigation";
import { useParams } from 'react-router-dom';
import '../css/exercise.css'

function Exercise() {
    const { name } = useParams();
    const [exerciseDetails, setExerciseDetails] = useState(null);

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

        fetchExerciseDetails();
    }, [name]);
// ...


    if (!exerciseDetails) {
        return <p>Loading...</p>;
    }

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
            </div>

        </div>
    );
}

export default Exercise;
