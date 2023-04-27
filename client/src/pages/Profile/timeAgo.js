import React, { useState, useEffect } from "react";
import moment from "moment";

const TimeAgo = ({ createdAt }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const postDate = moment(createdAt);
  const diffSeconds = currentTime.diff(postDate, "seconds");
  const diffMinutes = currentTime.diff(postDate, "minutes");
  const diffHours = currentTime.diff(postDate, "hours");
  const diffDays = currentTime.diff(postDate, "days");

  if (diffSeconds < 60) {
    return `${diffSeconds} sec ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return postDate.format("MMM DD, YYYY");
  }
};

export default TimeAgo;
