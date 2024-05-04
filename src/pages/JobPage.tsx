import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../store/jobDataSlice";
import Filterbar from "../components/Filterbar";
import { Typography } from "@mui/material";

const JobPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state:any) => state.isLoading);

  useEffect(() => {
    dispatch(fetchJobs());
    return;
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
