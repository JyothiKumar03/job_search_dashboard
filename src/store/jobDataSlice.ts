import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fetchJobsData } from "../APIs/jobsAPI";
import { Dispatch } from 'redux';
import { AppThunk } from './store'; // Import AppThunk type


interface JobDataState {
    JobData: any;
    loading: boolean;
    error: string | null;
}

const initialState : JobDataState= {
    JobData: [],
    loading: false,
    error: null,
  };

const jobSlice = createSlice({
    name : "jobsData",
    initialState,
    reducers: {
        startFetching(state) {
            state.loading = true,
            state.error = null
        },
        setJobs(state, action) { 
            state.JobData.push(...action.payload);
            state.loading = false;
        },
        fetchJobsError(state, action){
            state.loading = false;
            state.error = action.payload;
        }
    },
})

export const {startFetching, setJobs, fetchJobsError} = jobSlice.actions;

export const fetchJobs = async (dispatch: Dispatch<any>) => {
    dispatch(startFetching()); // Dispatch startFetching action
    try {
      const data = await fetchJobsData(0, 10); // Assuming you pass offset and limit to fetchJobsData
      dispatch(setJobs(data.jdList)); // Dispatch setJobs action with fetched data
      return data.jdList;
    } catch (error: any) {
      console.error(`Error occurred during fetching of Jobs data - ${error.message}`);
      dispatch(fetchJobsError("Error occurred during fetching of Jobs data")); // Dispatch fetchJobsError action
      throw error; // Throw error to be caught by caller
    }
  };
  

export default jobSlice.reducer;


