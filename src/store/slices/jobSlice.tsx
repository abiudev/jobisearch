import { FetchJobs } from "@/components/fetchJobs";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  status: "idle",
  searchTerm: "string",
  selectedCountry: "string",
  error: "string",
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchJobs.fulfilled, (state, action) => {
        state.status = "success";
        state.jobs = action.payload;
      })
      .addCase(FetchJobs.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.error.message || "An unknown error must have occured";
      });
  },
});

export const jobReducer = jobSlice.reducer;
