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
          "x-rapidapi-key":
            "2d12bdeb1amsh08886e74d320870p10d4b1jsneb8a25492f69",
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        console.log(selectedCountry);
        // console.log(searchTerm);
      } catch (error) {
        console.error(error);
      }
      const response = await axios.request(options);
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "An unknown error occurred" };
    }
  }
);
