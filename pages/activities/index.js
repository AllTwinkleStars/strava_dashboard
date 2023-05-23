import { useEffect, useState } from "react";
import activityStyles from '../../styles/activities.module.css';
import SportFilter from "../../components/Activities/Filters/SportFilter";
import DateFilter from "../../components/Activities/Filters/DateFilter";
import AllActivities from "../../components/Activities/AllActivities";
import { useSpring, animated } from '@react-spring/web';
import dayjs from "dayjs";

function Activities({ activities }) {

    const firstItemDate = new Date(activities[0].start_date_local);
    const lastItemDate = new Date(activities[activities.length - 1].start_date_local);
    const [startDate, setStartDate] = useState(dayjs(lastItemDate));
    const [endDate, setEndDate] = useState(dayjs(firstItemDate));
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [selectedSportTypes, setSelectedSportTypes] = useState([]);
    const perPage = 30;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        handleSportTypeFilter();
    }, [selectedSportTypes]);

    const handleSportTypeFilter = () => {
        let filtered = activities;

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

    const springs = useSpring({
        from: { x: -100 },
        to: { x: 0 },
    })

    return (
        <animated.div
            style={{
                ...springs,
            }}>
            <div className="container">
                <div className={activityStyles.titleFilter}>
                    <h1 className={activityStyles.title}>
                        All Activities
                    </h1>
                    <SportFilter
                        selectedSportTypes={selectedSportTypes}
                        setSelectedSportTypes={setSelectedSportTypes}
                        parsedActivities={activities}
                    />
                    <DateFilter
                        parsedActivities={activities}
                        firstItemDate={firstItemDate}
                        lastItemDate={lastItemDate}
                        selectedSportTypes={selectedSportTypes}
                        setFilteredActivities={setFilteredActivities}
                        setCurrentPage={setCurrentPage}
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </div>
                <AllActivities
                    filteredActivities={filteredActivities}
                    paginatedActivities={paginatedActivities}
                    totalPages={totalPages}
                    currentActivitiesCount={currentActivitiesCount}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                />
            </div>
        </animated.div>
    );
}

export default Activities;