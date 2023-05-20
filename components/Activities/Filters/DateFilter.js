import React from 'react';
import activityStyles from '../../../styles/activities.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ startDate, endDate, setStartDate, setEndDate, resetDateFilter, firstItemDate, lastItemDate }) => {
    
  return (
    <div className={activityStyles.dateFilter}>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                        dateFormat="dd/MM/yyyy"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="End Date"
                        dateFormat="dd/MM/yyyy"
                    />
                    <button
                        className={activityStyles.reset}
                        onClick={resetDateFilter}
                        disabled={startDate?.toISOString() === lastItemDate?.toISOString() && endDate?.toISOString() === firstItemDate?.toISOString()}
                    >
                        Reset
                    </button>
                </div>
  )
}

export default DateFilter
