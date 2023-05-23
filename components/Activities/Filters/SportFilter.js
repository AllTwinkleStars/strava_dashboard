import { useRef } from 'react';
import activityStyles from '../../../styles/activities.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SportFilter = ({ selectedSportTypes, setSelectedSportTypes, parsedActivities }) => {
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

  const uniqueSportTypes = parsedActivities ? [...new Set(parsedActivities.map(activity => activity.sport_type))] : [];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: uniqueSportTypes.length > 5 ? 5 : uniqueSportTypes.length,
    slidesToScroll: 5,
  };

  return (
    <div className={activityStyles.sportFilter} ref={sportFilterRef}>
      <div className={activityStyles.sliderContainer}>
        <Slider {...settings}>
          {uniqueSportTypes.map((sportType) => (
            <div
              key={sportType}
              className={`${activityStyles.filterOption} ${selectedSportTypes.includes(sportType) ? activityStyles.active : ""}`}
              onClick={() => handleSportTypeClick(sportType)}
            >
              <img src={`/img/${sportType.toLowerCase()}.png`} alt={sportType} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SportFilter;
