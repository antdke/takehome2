import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

export default function FilterDropdown({
  filters,
  selectedFilters,
  onFilterChange,
}) {
  const handleFilterChange = (event, filterType) => {
    const { value } = event.target;
    onFilterChange(filterType, value);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      {Object.entries(filters).map(([filterType, filterValues]) => (
        <FormControl key={filterType} variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id={`${filterType}-label`}>{filterType}</InputLabel>
          <Select
            labelId={`${filterType}-label`}
            value={selectedFilters[filterType] || ""}
            onChange={(e) => handleFilterChange(e, filterType)}
            label={filterType}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {filterValues.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
}

FilterDropdown.propTypes = {
  filters: PropTypes.object.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
