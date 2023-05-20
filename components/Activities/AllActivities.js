import React from 'react';
import activityStyles from '../../styles/activities.module.css';
import { formatDate, formatTime, getImageSrc, metersToKilometers } from '../../helper_functions/helper';
import Link from 'next/link';
import Image from 'next/image';

const AllActivities = ({ filteredActivities, paginatedActivities }) => {
  return (
    <div className={activityStyles.allActivities}>
      <div className={activityStyles.individualHeaderStatContainer}>
                <div className={activityStyles.textEllipsisHeader}>
                    Activity Name
                </div>
                <div className={activityStyles.individualHeaderStat}>
                    Date
                </div>
                <div className={activityStyles.individualHeaderStat}>
                    Sport Type
                </div>
                <div className={activityStyles.individualHeaderStat}>
                    Distance
                </div>
                <div className={activityStyles.individualHeaderStat}>
                    Elapsed Time
                </div>
                <div className={activityStyles.individualHeaderStat}>
                    Moving Time
                </div>
                <div className={activityStyles.individualHeaderStat}>
                    Kudos Count
                </div>
                <div className={activityStyles.individualHeaderStat}>
                    More Details
                </div>
            </div>
            <div id="activityContainer" className={activityStyles.activityContainer}>

                {filteredActivities.length === 0 ? (
                    <div className={activityStyles.noActivities}>No activities found.</div>
                ) : (
                    <div className={activityStyles.activityList}>
                        {paginatedActivities.map((activity) => (
                            <div className={activityStyles.activity} key={activity.id}>
                                <div className={activityStyles.individualStatContainer}>
                                    <h1 className={activityStyles.textEllipsis}>{activity.name}</h1>
                                    <div className={activityStyles.individualStat}>
                                        {formatDate(activity.start_date_local)}
                                    </div>
                                    <div className={activityStyles.individualStat}>
                                        <Image
                                            src={getImageSrc(activity.sport_type)}
                                            width={32}
                                            height={32}
                                            alt="sport type"
                                        />
                                    </div>
                                    <div className={activityStyles.individualStat}>
                                        <p>{activity.distance !== 0 ? metersToKilometers(activity.distance) + "KM" : "NA"}</p>
                                    </div>
                                    <div className={activityStyles.individualStat}>
                                        <p>{formatTime(activity.elapsed_time)}</p>
                                    </div>
                                    <div className={activityStyles.individualStat}>
                                        <p>{formatTime(activity.moving_time)}</p>
                                    </div>
                                    <div className={activityStyles.individualStat}>
                                        <p>{activity.kudos_count} Kudos</p>
                                    </div>
                                    <div className={activityStyles.individualStat}>
                                        <Link className={activityStyles.moreDetails} href={`./activities/${activity.id}`} >
                                            More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
    </div>
  )
}

export default AllActivities
