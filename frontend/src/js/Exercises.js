import Navigation from "../components/Navigation";
import axios from "axios";
import {useEffect, useState} from "react";
import '../css/exercises.css'

function Exercises()
{
    /*
    const [exerciseList, setExerciseList] = useState([]);

    useEffect(() => {
        // Dodaj swój prywatny klucz do API
       // const apiKey = 'ClHcoK1sCkiGzDa70V3FHw==HNfiD4A6A5NcDXtv';

        // Definicja funkcji do pobierania danych z API
        const fetchData = async () => {
            try {
                // Ustawienie nagłówka z kluczem API
                const headers = {
                    'X-Api-Key': apiKey,
                };

                // Pobranie danych z API z użyciem nagłówka i parametru 'muscle'
                const response = await axios.get(`https://api.api-ninjas.com/v1/exercises`, { headers });
                setExerciseList(response.data); // Aktualizacja stanu z danymi z API
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Wywołanie funkcji do pobierania danych przy zamontowaniu komponentu
        fetchData();
    }, []); // Muskel jest teraz zależnością useEffect, więc efekt zostanie ponownie uruchomiony przy zmianie wartości muscle


        <ul>
                    {/* Mapowanie danych z API na elementy listy }
        {exerciseList.map((exercise) => (
    <li key={exercise.name}>{exercise.name}</li>
        ))}
    </ul>

*/


    return(
        <div className="base-container">
            <Navigation/>
            <section className="content">
                <h1>Exercises</h1>

            </section>
        </div>
    )
}
export default Exercises
