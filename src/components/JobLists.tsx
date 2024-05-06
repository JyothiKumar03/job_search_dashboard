import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Button } from "@mui/material";
import JobCard from "./JobCard";

const JobLists = ({
  jobs,
  filterRole,
  filterLocation,
  filterExperience,
  filterCompany,
  filterTechStack,
  filterRemote,
  filterMinBasePay,
}: any) => {
  const [visibleJobs, setVisibleJobs] = useState(5); // Number of initially visible jobs
  const [loading, setLoading] = useState(false);

  const filteredJobs = jobs.filter((job: any) => {
    const matchesRole =
      job?.jobRole.toLowerCase()?.includes(filterRole.toLowerCase()) ||
      !filterRole;

    const matchesLocation =
      job?.location.toLowerCase()?.includes(filterLocation.toLowerCase()) ||
      !filterLocation;

    const matchesExperience =
      job?.minExp?.toString()?.includes(filterExperience) ||
      !filterExperience;

    const matchesCompany =
      job?.companyName.toLowerCase()?.includes(filterCompany.toLowerCase()) ||
      !filterCompany;

    const matchesTechStack =
      !filterTechStack ||
      (job?.jobRole &&
        job?.jobRole.toLowerCase()?.includes(filterTechStack.toLowerCase()));

    const matchesRemote =
      (!filterRemote && job?.location) || // Include all jobs if "All" is selected or if the job has a location
      (filterRemote === "remote" &&
        job?.location.toLowerCase().includes("remote")) || // Include only remote jobs if "Remote" is selected
      (filterRemote === "on-site" &&
        !job?.location.toLowerCase().includes("remote")); // Include only on-site jobs if "On-site" is selected

    const matchesMinBasePay =
      !filterMinBasePay ||
      (job?.minJdSalary && job?.minJdSalary >= filterMinBasePay);

    return (
      matchesRole &&
      matchesLocation &&
      matchesExperience &&
      matchesCompany &&
      matchesTechStack &&
      matchesRemote &&
      matchesMinBasePay
    );
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const visibleJobIndex = Math.min(visibleJobs - 1, filteredJobs.length - 1);
    if (event.key === "ArrowRight") {
      const nextIndex = Math.min(visibleJobIndex + 1, filteredJobs.length - 1);
      document.getElementById(`jobCard-${nextIndex}`)?.focus();
      setVisibleJobs((prev) => Math.min(prev + 1, nextIndex + 1));
    } else if (event.key === "ArrowLeft") {
      const prevIndex = Math.max(visibleJobIndex - 1, 0);
      document.getElementById(`jobCard-${prevIndex}`)?.focus();
      setVisibleJobs((prev) => Math.max(prev - 1, prevIndex + 1));
    }
  };
  
  
  
  // infinite scrool feature
  const loadMoreJobs = () => {
    setVisibleJobs((prev) => prev + 5);
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <Grid container spacing={8}>
        {filteredJobs.slice(0, visibleJobs).map((job: any, index: any) => (
          <Grid item key={`${job.jdUid} - ${index}`} xs={12} sm={6} md={4}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />}
      {!loading && filteredJobs.length === 0 && (
        <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
          <h2>NO JOBS FOUND</h2>
        </div>
      )}{" "}
      {!loading && visibleJobs < filteredJobs.length && ( // Show Load More button if there are more jobs to load
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button onClick={loadMoreJobs} variant="contained" style={{}}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobLists;



