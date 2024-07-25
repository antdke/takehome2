import React from "react";
import PropTypes from "prop-types";
import { Box, FormControl, Autocomplete, TextField } from "@mui/material";

export default function FilterDropdown({
  filters,
  selectedFilters,
  onFilterChange,
}) {
  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
      {Object.entries(filters).map(([filterType, filterValues]) => (
        <FormControl key={filterType} sx={{ minWidth: 200 }}>
          <Autocomplete
            disablePortal
            id={`${filterType}-autocomplete`}
            options={filterValues}
            value={selectedFilters[filterType] || null}
            onChange={(event, newValue) =>
              handleFilterChange(filterType, newValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={filterType}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "rgba(0, 0, 0, 0.6)",
                  },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "rgba(0, 0, 0, 0.6)",
                  },
                }}
              />
            )}
          />
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
