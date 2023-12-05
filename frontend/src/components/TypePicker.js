import {useState} from "react";
import Select from "react-select";
import '../css/pickers.css'

function TypePicker({onTypeChange}){
    const options = [
        { value: "", label: "All" },
        { value: "cardio", label: "Cardio" },
        { value: "olympic_weightlifting", label: "Olympic Weightlifting" },
        { value: "plyometrics", label: "Plyometrics" },
        { value: "powerlifting", label: "Powerlifting" },
        { value: "strength", label: "Strength" },
        { value: "stretching", label: "Stretching" },
        { value: "strongman", label: "Strongman" }
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onTypeChange(selectedOption?.value);
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
export default TypePicker
