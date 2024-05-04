import { useState } from "react";
import { UseSelector, useDispatch } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import JobCard from "./JobCard";

// import infiniteScrool form 'react-infiniteScrool


const JobLists = ({jobs, filterRole, filterLocation, filterExperience} : any) => {
    const filterJobs = (job : any) => {
        return (
            job.jobRole.toLowerCase()?.includes(filterRole.toLowerCase()) && 
            job.location.toLowerCase()?.includes(filterLocation.toLowerCase()) && 
            job.minExp?.toString()?.includes(filterExperience)
        )
    }
  return (
    <div>
        <Grid container spacing={8}>
            {jobs.filter(filterJobs).map((job : any,index : number) => (
                <Grid
                item
                key={`${job.jdUid} - ${index}`}
                xs={12}
                sm={6}
                md={4}
                >
                    <JobCard job={job} />
                </Grid>
            ))}
        </Grid>
    </div>
  )
}

export default JobLists
