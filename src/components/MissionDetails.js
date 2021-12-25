import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import MissionDetailsTable from "./MissionDetailsTable";
import youtube from "../assets/images/youtube.png";
import wiki from "../assets/images/wiki.png";
import article from "../assets/images/article.jpg";
import { getStatusData } from "../utils";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between"
  },

  header: {
    display: "flex"
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 14,
    paddingRight: 14
  },
  image: {
    width: 18,
    height: 18,
    paddingRight: 5,
    cursor: "pointer"
  },
  status: {
    paddingLeft: 14,
    paddingRight: 14
  },
  close: {
    backgroundColor: "#ffffff",
    height: 14,
    width: 14,
    "&:hover": {
      backgroundColor: "#ffffff !important"
    }
  }
}));

export default function MissionDetails(props) {
  const classes = useStyles();
  const { handleClose, open, modalData } = props;
  const filteredModalData = [
    {
      name: "Flight Number",
      value: modalData.flightNumber
    },
    { name: "Mission Name", value: modalData.missionName },
    { name: "Rocket Type", value: modalData.rocketType },
    { name: "Rocket Name", value: modalData.rocketName },
    { name: "Manufacturer", value: modalData.manufacturer },
    { name: "Nationlaity", value: modalData.nationality },
    { name: "Launch Date", value: modalData.launchedDate },
    { name: "Payload Type", value: modalData.payloadType },
    { name: "Orbit", value: modalData.orbit },
    { name: "Launch Site", value: modalData.launchSite }
  ];

  const openWikipedia = (url) => {
    console.log(url, "url");
    window.open(url, "_blank");
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle className={classes.dialogTitle}>
          <div className={classes.header}>
            <img
              src={modalData.image}
              alt={modalData.rocketName}
              style={{ width: "50px", height: "50px" }}
            />
            <div className={classes.headerInfo}>
              <Typography variant="body1">{modalData.missionName}</Typography>
              <Typography variant="caption">{modalData.rocketName}</Typography>
              <div>
                <a href={modalData.articleLink}>
                  <img
                    src={article}
                    alt="article"
                    className={classes.image}
                    target="_blank"
                  />
                </a>
                <a href={modalData.wikipediaLink}>
                  <img
                    src={wiki}
                    alt="wikipedia"
                    className={classes.image}
                    target="_blank"
                  />
                </a>
                <a href={modalData.youtubeLink}>
                  <img
                    src={youtube}
                    alt="youtube"
                    className={classes.image}
                    target="_blank"
                  />
                </a>
              </div>
            </div>
            <Typography
              style={getStatusData(modalData.launchStatus)}
              className={classes.status}
            >
              {modalData.launchStatus}
            </Typography>
          </div>
          <IconButton onClick={handleClose} className={classes.close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modalData.details}{" "}
            <span
              onClick={() => openWikipedia(modalData.wikipediaLink)}
              style={{ color: "#0398fc", cursor: "pointer" }}
            >
              Wikipedia
            </span>
          </DialogContentText>
          <MissionDetailsTable filteredModalData={filteredModalData} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
