import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Typography,
  Box,
} from "@mui/material";
import formatTimeRemaining from "../utils/formatTimeRemaining";

export default function CaseTable({ patients }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Patient Status</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: "#D9D9D9",
                      color: "#484848",
                      marginRight: 2,
                    }}>
                    {`${patient.firstName[0]}${patient.lastName[0]}`}
                  </Avatar>
                  <Typography variant="body1">
                    {patient.firstName} {patient.lastName}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{patient.status}</TableCell>
              <TableCell sx={{ color: "green" }}>
                {formatTimeRemaining(patient.timeElapsed)}
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Review Case
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CaseTable.propTypes = {
  patients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      timeElapsed: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
