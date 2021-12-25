import React, { useState, useEffect } from "react";
//import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import axios from "axios";
import { filterRowdata, getStatusData, getFilteredData } from "../utils";
import { isEmpty } from "lodash";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MissionDialog from "./MissionDetails";
const columns = [
  { id: "flightNumber", label: "No:", minWidth: 30 },
  { id: "launchedDate", label: "Launched (UTC)", minWidth: 100 },
  {
    id: "location",
    label: "Location",
    minWidth: 100
  },
  {
    id: "missionName",
    label: "Mission",
    minWidth: 100
  },
  {
    id: "orbit",
    label: "Orbit",
    minWidth: 50
  },
  {
    id: "launchStatus",
    label: "Launch Status",
    minWidth: 60
  },
  {
    id: "rocketName",
    label: "Rocket",
    minWidth: 100
  }
];

const SpacexInformation = (props) => {
  const { filterValue } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [spacexInfo, setSpacexInfo] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [copyRowData, setCopyRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState({});
  /*  Get Data From Api  */
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((res) => setSpacexInfo(res.data));
  }, []);

  useEffect(() => {
    if (filterValue !== "all" && rowData?.length) {
      const filteredData = copyRowData?.filter(
        (each) => each.launchStatus.toLowerCase() === filterValue
      );
      setRowData(filteredData);
    } else {
      setRowData(copyRowData);
    }
  }, [filterValue]);

  /* Filter Row Data From Api Response */

  useEffect(() => {
    if (!isEmpty(spacexInfo)) {
      const rowInfomation = filterRowdata(spacexInfo);
      const removedDuplictes = getFilteredData(rowInfomation);

      setIsLoading(false);
      setRowData(removedDuplictes);
      setCopyRowData(removedDuplictes);
    }
  }, [spacexInfo]);
  const handleChangePage = (event, newPage) => {
    console.log(event, "event");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event, "event");
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = (data) => {
    setModalData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rowData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.flightNumber}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        const status =
                          column.id === "launchStatus" && getStatusData(value);

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "launchStatus" ? (
                              <Button
                                style={status}
                                fullWidth
                                onClick={() => handleClickOpen(row)}
                              >
                                {" "}
                                {value}
                              </Button>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {!isLoading && (
          <TablePagination
            rowsPerPageOptions={[8, 15, 20]}
            component="div"
            count={rowData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            
            <CircularProgress />
          </Box>
        )}
      </Box>
      <MissionDialog
        handleClose={handleClose}
        open={open}
        modalData={modalData}
      />
    </>
  );
};

export default SpacexInformation;
