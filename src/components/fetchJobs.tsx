import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({
    searchTerm,
    selectedCountry,
  }: {
    searchTerm: string;
    selectedCountry: string;
  }) => {
    try {
      console.log("Selected Country:", selectedCountry);
      const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/search",
        params: {
          query: searchTerm,
          page: "1",
          num_pages: "1",
          country: selectedCountry,
          date_posted: "all",
        },
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      };
      console.log("API Key:", import.meta.env.VITE_RAPIDAPI_KEY);


      const response = await axios.request(options);
      console.log(response.data);
      
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "An unknown error occurred" };
    }
  }
);
