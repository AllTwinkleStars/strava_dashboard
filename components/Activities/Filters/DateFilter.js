import React, { useState, useEffect } from 'react';
import activityStyles from '../../../styles/activities.module.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

const DateFilter = ({
  parsedActivities,
  firstItemDate,
  lastItemDate,
  selectedSportTypes,
  setFilteredActivities,
  setCurrentPage,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) => {
  const resetDateFilter = () => {
    if (lastItemDate && firstItemDate) {
      setStartDate(dayjs(lastItemDate));
      setEndDate(dayjs(firstItemDate));
    }
  };

  const handleDateFilter = () => {
    let filtered = parsedActivities.filter(activity => {
      const activityDate = new Date(activity.start_date_local);
      if (
        (startDate && activityDate < startDate) ||
        (endDate && activityDate > endDate)
      ) {
        return false;
      }
      return true;
    });

    if (selectedSportTypes.length > 0) {
      filtered = filtered.filter(activity =>
        selectedSportTypes.includes(activity.sport_type)
      );
    }

    setFilteredActivities(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleDateFilter();
  }, [endDate, startDate]);

  return (
    <div className={activityStyles.dateFilter}>
      <div className={activityStyles.dateFieldsContainer}>
        <div className={activityStyles.dateFields}>
          <DatePicker
            onChange={date => setStartDate(date)}
            format="DD/MM/YYYY"
            label="Start Date"
            value={dayjs(startDate)}
          />
          <DatePicker
            onChange={date => setEndDate(date)}
            format="DD/MM/YYYY"
            label="End Date"
            value={dayjs(endDate)}
          />
        </div>
        <div className={activityStyles.resetButton}>
          <button
            className={activityStyles.reset}
            onClick={resetDateFilter}
            disabled={
              dayjs(startDate).isSame(dayjs(lastItemDate)) &&
              dayjs(endDate).isSame(dayjs(firstItemDate))
            }
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
