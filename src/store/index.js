import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "./patientsSlice";
import riskFactorsReducer from "./riskFactorsSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    riskFactors: riskFactorsReducer,
  },
});
