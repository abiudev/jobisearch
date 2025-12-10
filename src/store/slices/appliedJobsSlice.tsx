import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../lib/api';

interface AppliedJob {
  id: string;
  job_id: string;
  job_title: string;
  company: string;
  location?: string;
  job_type?: string;
  salary?: string;
  description?: string;
  job_url?: string;
  applied_at: string;
  status: string;
  notes?: string;
}

interface AppliedJobsState {
  jobs: AppliedJob[];
  loading: boolean;
  error: string | null;
}

const initialState: AppliedJobsState = {
  jobs: [],
  loading: false,
  error: null,
};

export const applyToJob = createAsyncThunk(
  'appliedJobs/apply',
  async (jobData: {
    jobId: string;
    jobTitle: string;
    company: string;
    location?: string;
    jobType?: string;
    salary?: string;
    description?: string;
    jobUrl?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.post('/jobs/apply', jobData);
      return response.data.application;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to apply to job');
    }
  }
);

export const fetchAppliedJobs = createAsyncThunk(
  'appliedJobs/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/jobs/applied');
      return response.data.applications;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch applied jobs');
    }
  }
);

export const removeAppliedJob = createAsyncThunk(
  'appliedJobs/remove',
  async (applicationId: string, { rejectWithValue }) => {
    try {
      await api.delete('/jobs/remove', { data: { applicationId } });
      return applicationId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to remove application');
    }
  }
);

const appliedJobsSlice = createSlice({
  name: 'appliedJobs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyToJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyToJob.fulfilled, (state, action: PayloadAction<AppliedJob>) => {
        state.loading = false;
        state.jobs.unshift(action.payload);
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action: PayloadAction<AppliedJob[]>) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(removeAppliedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAppliedJob.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.jobs = state.jobs.filter(job => job.id !== action.payload);
      })
      .addCase(removeAppliedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = appliedJobsSlice.actions;
export const appliedJobsReducer = appliedJobsSlice.reducer;
