import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";

const RiskFactorChip = ({ risk, color }) => {
  return (
    <Chip
      label={risk}
      color={color || "default"}
      size="small"
      sx={{ margin: "2px" }}
    />
  );
};

RiskFactorChip.propTypes = {
  risk: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default RiskFactorChip;
