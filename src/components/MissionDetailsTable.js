import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export default function MissionDetailsTable(props) {
  const { filteredModalData } = props;
  return (
    <TableContainer>
      <Table size="small" padding="normal">
        <TableBody>
          {filteredModalData.map((each) => (
            <TableRow
              key={each.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {each.name}
              </TableCell>
              <TableCell>{each.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
