import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import "../css/exercises.css"
import { Link } from "react-router-dom";
import MusclePicker from "../components/MusclePicker";
import TypePicker from "../components/TypePicker";
import DifficultyPicker from "../components/DifficultyPicker";
import SearchBar from "../components/SearchBar";

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [name, setName] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/exercises',
                params: {
                    name: name || '',
                    type: selectedType || '',
                    muscle: selectedMuscle || '',
                    difficulty: selectedDifficulty || '',
                },
                headers: {
                    'X-Api-Key': 'ClHcoK1sCkiGzDa70V3FHw==HNfiD4A6A5NcDXtv',
                }
            };

            try {
                const response = await axios.request(options);
                setExercises(response.data);
            } catch (error) {

            }
        };

        fetchData();
    }, [name, selectedType, selectedMuscle, selectedDifficulty]);  // Dodaj zależności, aby useEffect reagował na zmiany w pickerach

    const handleMuscleChange = (muscle) => {
        setSelectedMuscle(muscle);
    };
    const handleTypeChange = (type) => {
        setSelectedType(type);
    };
    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    const handleNameChange = (name) => {
        setName(name);
    };


    return (
        <div className="base-container">
            <Navigation />
            <section className="content">
                <h1>Exercises</h1>
                <SearchBar onNameChange={handleNameChange}></SearchBar>
                <div className="pickers">
                    <MusclePicker onMuscleChange={handleMuscleChange}></MusclePicker>
                    <TypePicker onTypeChange={handleTypeChange}></TypePicker>
                    <DifficultyPicker onDifficultyChange={handleDifficultyChange}></DifficultyPicker>
                </div>

                <ul className="exercises-list">
                    {exercises.map((exercise, index) => (
                        <li key={index}>
                            <p><strong>Name: </strong><Link className='exercise-link' to={`/exercises/${exercise.name}`}>{exercise.name}</Link> </p>
                            <p><strong>Type: </strong> {exercise.type}</p>
                            <p><strong>Muscle: </strong> {exercise.muscle}</p>
                            <p><strong>Equipment: </strong> {exercise.equipment}</p>
                            <p><strong>Difficulty: </strong> {exercise.difficulty}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Exercises;
