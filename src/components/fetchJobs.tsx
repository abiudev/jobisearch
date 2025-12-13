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
      
      const baseURL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api';
      
      const response = await axios.get(`${baseURL}/jobs/search`, {
        params: {
          query: searchTerm,
          country: selectedCountry,
          page: '1',
          num_pages: '1',
          date_posted: 'all',
        },
      });
      
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
