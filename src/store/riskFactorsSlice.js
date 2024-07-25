import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRiskFactors } from "../utils/fetchRiskFactors";

export const fetchRiskFactorsAsync = createAsyncThunk(
  "riskFactors/fetchRiskFactors",
  async () => {
    return await fetchRiskFactors();
  },
);

const riskFactorsSlice = createSlice({
  name: "riskFactors",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiskFactorsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRiskFactorsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchRiskFactorsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default riskFactorsSlice.reducer;
