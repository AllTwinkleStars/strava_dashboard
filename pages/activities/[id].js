import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetchActivityDetails from "../../Requests/FetchActivityDetails";
import styles from '../../styles/activityDetails.module.css';
import dynamic from "next/dynamic";
import ChevronLeft from '../../Icons/ChevronLeft';
import Loader from "../../Icons/Hexagon";
import loaderStyles from '../../styles/Loader.module.css';

const MyMap = dynamic(() => import("../../components/Activities/Map"), { ssr: false })

function ActivityDetails() {
    const router = useRouter();
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const accessToken = localStorage.getItem("accessToken");

    async function fetchDetails() {
        const activityId = router.query.id;
        const activity = await fetchActivityDetails(accessToken, activityId);
        return activity;
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const detailsResponse = await fetchDetails();
            setDetails(detailsResponse);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const handleGoBack = () => {
        router.back();
    };

    if (isLoading) {
        return (
          <div className={loaderStyles.newcontainer}>
            <div className={loaderStyles.loadingText}>Loading Activity</div>
            <div className={loaderStyles.loaderContainer}>
              <div className={loaderStyles.loading}>
                <Loader />
              </div>
            </div>
          </div>
        );
      }

    return (
        <div className="container">
            <button className={styles.backButton} onClick={handleGoBack}><ChevronLeft />Back</button>
            <h1>{details.name}</h1>
            {details && (
                <div className={styles.ActivityDetailsContainer}>
                    
                    <div className={styles.detailsContainer}>

                        <div className={styles.mapContainer}>
                            <MyMap start_latlng={details.start_latlng} polyline={details.map.summary_polyline} />
                        </div>
                        <div className={styles.details}>
                            <div>{details.description}</div>
                            <div>{details.distance}</div>
                            <div>{details.moving_time}</div>
                            <div>{details.elapsed_time}</div>
                            <div>{details.sport_type}</div>
                            <div>{details.start_date_local}</div>
                            <div>{details.achievement_count}</div>
                            <div>{details.kudos_count}</div>
                            <div>{details.comment_count}</div>
                            <div>{details.average_speed}</div>
                            <div>{details.max_speed}</div>
                            <div>{details.average_cadence}</div>
                            <div>{details.average_temp}</div>
                            <div>{details.calories}</div>
                            <div>{details.average_temp}</div>
                            <div>{details.average_temp}</div>
                            <div>{details.average_temp}</div>
                            <div>{details.average_temp}</div>
                        </div>

                    </div>
                </div>

            )}

        </div>
    );
}

export default ActivityDetails;
