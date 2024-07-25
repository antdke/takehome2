import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyzePatientRisks } from "../utils/analyzePatientRisks";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (_, { getState }) => {
    const response = await fetch("http://localhost:3001/patients");
    const patients = await response.json();
    const riskFactors = getState().riskFactors.list;

    // Analyze risks for each patient
    const patientsWithRisks = await Promise.all(
      patients.map(async (patient) => {
        const risks = await analyzePatientRisks(patient, riskFactors);
        return { ...patient, risks };
      }),
    );

    return patientsWithRisks;
  },
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default patientsSlice.reducer;
