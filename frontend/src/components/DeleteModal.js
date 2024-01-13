// DeleteModal.js
import React from 'react';
import '../css/modals.css'

const DeleteModal = ({ isOpen, onClose, onDeleteDetails, selectedDetailId }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            // Call the backend API to delete details
            const response = await fetch(`http://localhost:8080/api/plan-details/${selectedDetailId}`, {
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${token}`}
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Call the onDeleteDetails callback with the deleted details ID
            onDeleteDetails(selectedDetailId);

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error deleting plan details:', error);
        }
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Delete Details</h2>
                    <p>Are you sure you want to delete these details?</p>
                    <button className='buttons' onClick={handleDelete}>Delete</button>
                    <button className='buttons' onClick={onClose}>Cancel</button>
                </div>
            </div>
        )
    );
};

export default DeleteModal;
