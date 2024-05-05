import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../store/jobDataSlice";
import Filterbar from "../components/Filterbar";
import { Typography } from "@mui/material";

const JobPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state:any) => state.isLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchJobs(dispatch); // Call fetchJobs with dispatch passed as a parameter
      } catch (error) {
        console.error("Error occurred during fetching of Jobs data:", error);
      }
    };

    fetchData();

    return () => {
      // Clean-up function (if needed)
    };
  }, [dispatch]);
  
  return (
    <div>
      <Typography
        variant="h4"
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px",
          fontWeight: "bold",
          paddingTop: "15px",
        }}
      >
        Candidate Application Platform
      </Typography>
      <Filterbar />
    </div>
  );
};

export default JobPage;
