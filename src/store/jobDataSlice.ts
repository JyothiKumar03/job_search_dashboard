import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fetchJobsData } from "../APIs/jobsAPI";

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

export const fetchJobs = () => async (dispatch : any, getState : any) => {
    dispatch(startFetching());
    try{
        const data = await fetchJobsData(0,10);
        dispatch(setJobs(data.jdList));
    } catch(error : any){
        dispatch(fetchJobsError("Error occured during fetching of Jobs data - "));
    }
}

export default jobSlice.reducer;


