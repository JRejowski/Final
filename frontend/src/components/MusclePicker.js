import {useState} from "react";
import Select from "react-select";
import '../css/pickers.css'

function MusclePicker({onMuscleChange}){
    const options = [
        { value: "", label: "All" },
        { value: "abdominals", label: "Abdominals" },
        { value: "abductors", label: "Abductors" },
        { value: "adductors", label: "Adductors" },
        { value: "biceps", label: "Biceps" },
        { value: "calves", label: "Calves" },
        { value: "chest", label: "Chest" },
        { value: "forearms", label: "Forearms" },
        { value: "glutes", label: "Glutes" },
        { value: "hamstrings", label: "Hamstrings" },
        { value: "lats", label: "Lats" },
        { value: "lower_back", label: "Lower back" },
        { value: "middle_back", label: "Middle back" },
        { value: "neck", label: "Neck" },
        { value: "quadriceps", label: "Quadriceps" },
        { value: "traps", label: "Traps" },
        { value: "triceps", label: "Triceps" },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onMuscleChange(selectedOption?.value); // Przekazanie wybranej kategorii do komponentu nadrzędnego
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
export default MusclePicker
