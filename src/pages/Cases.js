import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Typography } from "@mui/material";
import { fetchPatients } from "../store/patientsSlice";

export default function Cases() {
  const dispatch = useDispatch();
  const {
    list: patients,
    status,
    error,
  } = useSelector((state) => state.patients);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Box sx={{ display: "flex", mt: "30px" }}>
        <Container maxWidth="xl">
          <Typography
            sx={{ color: "#484848", fontSize: 26, paddingBottom: 5 }}
            fontWeight="bold"
            gutterBottom
            variant="h4">
            Cases ({patients.length})
          </Typography>
          {/* Render your patients list here */}
        </Container>
      </Box>
    </div>
  );
}
