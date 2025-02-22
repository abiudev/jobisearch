import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchJobs } from "@/components/fetchJobs";

const initialState = {
  jobs: [],
  status: "idle",
  searchTerm: "",
  selectedCountry: "",
  error: "",
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSelectedCountry(state, action: PayloadAction<string>) {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchJobs.fulfilled, (state, action) => {
        state.status = "success";
        state.searchTerm=action.meta.arg.searchTerm;
        state.selectedCountry=action.meta.arg.selectedCountry;
        state.jobs = action.payload;
      })
      .addCase(FetchJobs.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export const { setSearchTerm, setSelectedCountry } = jobSlice.actions;
export const jobReducer = jobSlice.reducer;
