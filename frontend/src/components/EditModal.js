// EditModal.js
import React, { useState } from 'react';
import '../css/modals.css'

const EditModal = ({ isOpen, onClose, onUpdateDetails, selectedDetailId }) => {
    const [newSets, setNewSets] = useState('');
    const [newReps, setNewReps] = useState('');
    const [newRest, setNewRest] = useState('');

    const handleUpdate = async () => {
        try {
            // Perform any validation if needed
            const token = localStorage.getItem('jwtToken');
            // Call the backend API to update details
            const response = await fetch(`http://localhost:8080/api/plan-details/${selectedDetailId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sets: newSets,
                    reps: newReps,
                    rest: newRest,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedDetails = await response.json();

            // Call the onUpdateDetails callback with the updated details
            onUpdateDetails(updatedDetails);

            // Close the modal
            onClose();
        } catch (error) {

        }
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Edit Details</h2>
                    <label>Sets:
                        <input type="text" value={newSets} onChange={(e) => setNewSets(e.target.value)} />
                    </label>
                    <label>Reps:
                        <input type="text" value={newReps} onChange={(e) => setNewReps(e.target.value)} />
                    </label>
                    <label>Rest:
                        <input type="text" value={newRest} onChange={(e) => setNewRest(e.target.value)} />
                    </label>
                    <button className='buttons' onClick={handleUpdate}>Update</button>
                    <button className='buttons' onClick={onClose}>Cancel</button>
                </div>
            </div>
        )
    );
};

export default EditModal;
