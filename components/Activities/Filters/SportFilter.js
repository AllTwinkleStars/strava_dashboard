import { useRef } from 'react';
import activityStyles from '../../../styles/activities.module.css';


const SportFilter = ({ selectedSportTypes, setSelectedSportTypes }) => {

    const sportFilterRef = useRef(null);

    const handleSportTypeClick = (selectedSportType) => {
        setSelectedSportTypes((prevSelectedSportTypes) => {
            if (prevSelectedSportTypes.includes(selectedSportType)) {
                return prevSelectedSportTypes.filter((type) => type !== selectedSportType);
            } else {
                return [...prevSelectedSportTypes, selectedSportType];
            }
        });
    };

    return (
        <div className={activityStyles.sportFilter} ref={sportFilterRef}>
            <div className={activityStyles.imageFilter}>
                <div
                    className={`${activityStyles.filterOption} ${selectedSportTypes.includes("Run") ? activityStyles.active : ""}`}
                    onClick={() => handleSportTypeClick("Run")}
                >
                    <img src="/img/run.png" alt="Run" />
                </div>
                <div
                    className={`${activityStyles.filterOption} ${selectedSportTypes.includes("Ride") ? activityStyles.active : ""}`}
                    onClick={() => handleSportTypeClick("Ride")}
                >
                    <img src="/img/bike.png" alt="Ride" />
                </div>
                <div
                    className={`${activityStyles.filterOption} ${selectedSportTypes.includes("Swim") ? activityStyles.active : ""}`}
                    onClick={() => handleSportTypeClick("Swim")}
                >
                    <img src="/img/swimming.png" alt="Swim" />
                </div>
                <div
                    className={`${activityStyles.filterOption} ${selectedSportTypes.includes("WeightTraining") ? activityStyles.active : ""}`}
                    onClick={() => handleSportTypeClick("WeightTraining")}
                >
                    <img src="/img/dumbbell.png" alt="Weight Training" />
                </div>
            </div>
        </div>
    )
}

export default SportFilter;
