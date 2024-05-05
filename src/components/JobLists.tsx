// import { useState, useEffect } from "react";
// import { UseSelector, useDispatch } from "react-redux";
// import { CircularProgress, Grid } from "@mui/material";
// import JobCard from "./JobCard";

// // import infiniteScrool form 'react-infiniteScrool


// const JobLists = ({jobs, filterRole, filterLocation, filterExperience} : any) => {
//     const [visibleJobs, setVisibleJobs] = useState(10); // Number of initially visible jobs
//     const [loading, setLoading] = useState(false); 
   
//     const filterJobs = (job: any) => {
//         const isFilterApplied =
//           filterRole || filterLocation || filterExperience;
      
//         if (!isFilterApplied) {
//           return true;
//         }
//         const matchesRole = job?.jobRole.toLowerCase()?.includes(filterRole.toLowerCase()) || !filterRole;
//         const matchesLocation = job?.location.toLowerCase()?.includes(filterLocation.toLowerCase()) || !filterLocation;
//         const matchesExperience = job?.minExp?.toString()?.includes(filterExperience) || !filterExperience;
//         return matchesRole && matchesLocation && matchesExperience;
//       };
//       const loadMoreJobs = () => {
//         setVisibleJobs((prev) => prev + 10);
//       };

//       useEffect(() => {
//         // Add event listener to window scroll event
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//       }, []);
    
//       const handleScroll = () => {
//         // Check if user has scrolled to the bottom of the page
//         if (
//           window.innerHeight + window.scrollY >=
//           document.body.scrollHeight - 500
//         ) {
//           // Load more jobs
//           loadMoreJobs();
//         }
//       };
//       return (
//         <div>
//           <Grid container spacing={8}>
//             {jobs?.filter(filterJobs).slice(0, visibleJobs).map((job : any, index : any) => (
//               <Grid item key={`${job.jdUid} - ${index}`} xs={12} sm={6} md={4}>
//                 <JobCard job={job} />
//               </Grid>
//             ))}
//           </Grid>
//           {loading && <CircularProgress />} {/* Show loading indicator */}
//           {!loading && filterJobs.length === 0 && <p>No jobs found</p>} {/* Show message if no jobs found */}
//         </div>
//       );
// }

// export default JobLists
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Grid, Button } from "@mui/material";
import JobCard from "./JobCard";

  
  const JobLists = ({ jobs, filterRole, filterLocation, filterExperience, filterCompany,filterTechStack,filterRemote, filterMinBasePay } : any) => {
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
    // const matchesTechStack =
    //   filterTechStack &&
    //   job?.techStack &&
    //   job?.techStack.toLowerCase()?.includes(filterTechStack.toLowerCase());
    // const matchesRemote =
    //   filterRemote === "all" || (job?.remote && job?.remote.toLowerCase() === filterRemote);
    // const matchesMinBasePay =
    //   !filterMinBasePay ||
    //   (job?.minBasePay && job?.minBasePay >= filterMinBasePay);
  
    return (
      matchesRole &&
      matchesLocation &&
      matchesExperience &&
      matchesCompany 
    );
  });
  
  

  const loadMoreJobs = () => {
    setVisibleJobs((prev) => prev + 10);
  };

  return (
    <div>
      <Grid container spacing={8}>
        {filteredJobs.slice(0, visibleJobs).map((job : any, index : any) => (
          <Grid item key={`${job.jdUid} - ${index}`} xs={12} sm={6} md={4}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />} {/* Show loading indicator */}
      {!loading && filteredJobs.length === 0 && <p>No jobs found</p>}{" "}
      {/* Show message if no jobs found */}
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

