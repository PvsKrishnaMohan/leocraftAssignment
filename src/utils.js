export const getLanuchedDate = (date) => {
  const launchedDate = date.getDate();
  const launchedMonth = date.toLocaleString("default", { month: "long" });
  const launchedYear = date.getFullYear();
  const launchedHour = date.getHours().toString().padStart(2, "0");
  const launchedMinutes = date.getMinutes().toString().padStart(2, "0");
  const launchedDayInfo = `${launchedDate} ${launchedMonth} ${launchedYear} at ${launchedHour}:${launchedMinutes}`;
  return launchedDayInfo;
};

export const filterRowdata = (data) => {
  return data.map((each) => {
    return {
      flightNumber: each?.flight_number,
      launchedDate: getLanuchedDate(new Date(each?.launch_date_utc)),
      location: each?.launch_site?.site_name,
      missionName: each?.mission_name,
      orbit: each?.rocket?.second_stage?.payloads?.[0]?.orbit,
      launchStatus: each?.upcoming
        ? "Upcoming"
        : each?.launch_success
        ? "Success"
        : "Failed",
      rocketName: each?.rocket?.rocket_name,
      details: each?.details,
      rocketType: each?.rocket?.rocket_type,
      manufacturer: each?.rocket?.second_stage?.payloads?.[0]?.manufacturer,
      nationality: each?.rocket?.second_stage?.payloads?.[0]?.nationality,
      payloadType: each?.rocket?.second_stage?.payloads?.[0]?.payload_type,
      launchSite: each?.launch_site?.site_name,
      wikipediaLink: each?.wikipedia,
      articleLink: each?.links?.article_link,
      youtubeLink: each?.links?.video_link,
      image: each?.links?.mission_patch_small
    };
  });
};

export const getStatusData = (status) => {
  let statusStyles = {
    borderRadius: 12,
    height: 25,
    color: "#5e5c59"
  };
  switch (status) {
    case "Failed":
      statusStyles.backgroundColor = "#ffd9db";
      break;
    case "Success":
      statusStyles.backgroundColor = "#c0fad5";
      break;
    case "Upcoming":
      statusStyles.backgroundColor = "#fadea5";
      break;
    default:
      break;
  }
  return statusStyles;
};

export const getFilteredData = (data) => {
  return [...new Map(data.map((each) => [each.flightNumber, each])).values()];
};
