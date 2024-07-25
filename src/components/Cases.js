import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Typography } from "@mui/material";
import { fetchPatients } from "../store/patientsSlice";
import filterPatients from "../utils/filterPatients";
import CaseTable from "./CaseTable";
import FilterDropdown from "./FilterDropdown";

export default function Cases() {
  const dispatch = useDispatch();
  const {
    list: patients,
    status,
    error,
  } = useSelector((state) => state.patients);
  const [selectedFilters, setSelectedFilters] = useState({});

  const filters = useMemo(() => {
    if (patients.length === 0) return {};
    return {
      condition: [...new Set(patients.map((patient) => patient.condition))],
      allergies: [
        ...new Set(
          patients.flatMap((patient) => patient.allergies.split(", ")),
        ),
      ],
    };
  }, [patients]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [status, dispatch]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredPatients = filterPatients(patients, selectedFilters);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ display: "flex", mt: "30px" }}>
      <Container maxWidth="xl">
        <Typography
          sx={{ color: "#484848", fontSize: 26, paddingBottom: 5 }}
          fontWeight="bold"
          gutterBottom
          variant="h4">
          My Cases ({filteredPatients.length})
        </Typography>
        <FilterDropdown
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        <CaseTable patients={filteredPatients} />
      </Container>
    </Box>
  );
}
