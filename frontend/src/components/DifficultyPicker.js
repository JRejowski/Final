import {useState} from "react";
import Select from "react-select";
import '../css/pickers.css'

function DifficultyPicker({onDifficultyChange}){
    const options = [
        { value: "", label: "All" },
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "expert", label: "Expert" }
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onDifficultyChange(selectedOption?.value); // Przekazanie wybranej kategorii do komponentu nadrzędnego
    };

    return (
        <Select
            className="picker"
            options={options}
            value={selectedOption}
            onChange={handleChange}
        />
    );

}
export default DifficultyPicker
