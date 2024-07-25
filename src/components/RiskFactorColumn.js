import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import RiskFactorChip from "./RiskFactorChip";

const RiskFactorsColumn = ({ risks }) => {
  return (
    <Box>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {risks.length > 0 && risks[0] !== "No Risks Found" ? (
          risks.map((risk, index) => <RiskFactorChip key={index} risk={risk} />)
        ) : (
          <RiskFactorChip risk="No Risks Found" color="default" />
        )}
      </Box>
    </Box>
  );
};

RiskFactorsColumn.propTypes = {
  risks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RiskFactorsColumn;
