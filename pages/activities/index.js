import { useEffect, useState } from "react";
import activityStyles from '../../styles/activities.module.css';
import SportFilter from "../../components/Activities/Filters/SportFilter";
import DateFilter from "../../components/Activities/Filters/DateFilter";
import AllActivities from "../../components/Activities/AllActivities";

function Activities() {
    const storedActivities = localStorage.getItem('activityData');
    const parsedActivities = JSON.parse(storedActivities);

    const firstItemDate = new Date(parsedActivities[0].start_date_local);
    const lastItemDate = new Date(parsedActivities[parsedActivities.length - 1].start_date_local);

    const [filteredActivities, setFilteredActivities] = useState([]);
    const [startDate, setStartDate] = useState(lastItemDate);
    const [endDate, setEndDate] = useState(firstItemDate);
    const [selectedSportTypes, setSelectedSportTypes] = useState([]);
    const perPage = 30;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        handleDateFilter();
    }, [endDate, startDate]);

    useEffect(() => {
        handleSportTypeFilter();
    }, [selectedSportTypes]);

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


    const handleSportTypeFilter = () => {
        let filtered = parsedActivities;

        if (selectedSportTypes.length > 0) {
            filtered = filtered.filter((activity) =>
                selectedSportTypes.includes(activity.sport_type)
            );
        }

        filtered = filtered.filter((activity) => {
            const activityDate = new Date(activity.start_date_local);

            if (
                (startDate && activityDate < startDate) ||
                (endDate && activityDate > endDate)
            ) {
                return false;
            }

            return true;
        });

        setFilteredActivities(filtered);
        setCurrentPage(1);
    };

    const resetDateFilter = () => {
        if (lastItemDate && firstItemDate) {
            setStartDate(lastItemDate);
            setEndDate(firstItemDate);
        }
    };

    const totalPages = Math.ceil(filteredActivities.length / perPage);
    const paginatedActivities = filteredActivities.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const container = document.getElementById("activityContainer");
        if (container) {
            container.scrollTop = 0;
        }
    };

    const currentActivitiesCount = paginatedActivities.length; // Count of activities on the current page

    return (
        <div className="container">
            <div className={activityStyles.titleFilter}>
                <h1 className={activityStyles.title}>
                    All Activities
                </h1>
                <SportFilter selectedSportTypes={selectedSportTypes} setSelectedSportTypes={setSelectedSportTypes} />
                <DateFilter startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} resetDateFilter={resetDateFilter} firstItemDate={firstItemDate} lastItemDate={lastItemDate} />
            </div>
            <AllActivities filteredActivities={filteredActivities} paginatedActivities={paginatedActivities} />
        </div>
    );
}

export default Activities;