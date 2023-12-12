import React from "react";
import '../css/searchbar.css'

function SearchBar(props) {

    const handleInputChange = (event) => {
        const newName = event.target.value;
        props.onNameChange(newName);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search exercises"
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;
