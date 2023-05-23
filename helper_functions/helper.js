import { activityImages } from '../components/Global/ActivityImages';

export function metersToKilometers(meters) {
    const kilometers = meters / 1000;
    return kilometers.toFixed(2);
  }  
  
  export function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    let timeString = '';
  
    if (hours > 0) {
      timeString += `${hours.toString().padStart(2, '0')}:`;
    }
  
    if (minutes > 0 || hours > 0) {
      timeString += `${minutes.toString().padStart(2, '0')}:`;
    }
  
    timeString += `${remainingSeconds.toString().padStart(2, '0')}`;
  
    return timeString.trim();
  }
  
  
export const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
};
  
export const getImageSrc = (sportType) => {
  const activityImage = activityImages.find(
      (imageObj) => imageObj.sportType === sportType
  );
  return activityImage ? activityImage.image : null;
};

export const convertCamelCaseToWords = (text) => {
  // Use regular expression to insert spaces before capital letters
  return text.replace(/([A-Z])/g, ' $1').trim();
};