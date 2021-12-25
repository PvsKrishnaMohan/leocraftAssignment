import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  filterInfo: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0px 10px"
  }
}));

const FilterInformation = (props) => {
  const classes = useStyles();
  const { handleFilterValue, filterValue } = props;

  return (
    <div className={classes.filterInfo}>
      <Box sx={{ minWidth: 150 }}>
        <FormControl>
          <NativeSelect defaultValue="6Months">
            <option value="week">Past week</option>
            <option value="month">Past month</option>
            <option value="3Months">Past 3 months</option>
            <option value="6Months">Past 6 months</option>
          </NativeSelect>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 150 }}>
        <FormControl>
          <NativeSelect defaultValue={filterValue} onClick={handleFilterValue}>
            <option value="all">All Launches</option>
            <option value="upcoming">Upcoming Launches</option>
            <option value="success">Successful Launches</option>
            <option value="failed">Failed Launches</option>
          </NativeSelect>
        </FormControl>
      </Box>
    </div>
  );
};

export default FilterInformation;

