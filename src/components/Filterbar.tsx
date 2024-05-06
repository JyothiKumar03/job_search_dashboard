import React, { useState } from "react";
import { useSelector } from "react-redux";
import JobLists from "./JobLists";
import { Box, TextField, MenuItem } from "@mui/material";
import { RootState } from "../store/store";

const Filterbar = () => {
  const jobs = useSelector((state: RootState) => state.jobData.JobData);

  const [filterRole, setFilterRole] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [filterTechStack, setFilterTechStack] = useState("");
  const [filterRemote, setFilterRemote] = useState("");
  const [filterMinBasePay, setFilterMinBasePay] = useState("");

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterLocation(e.target.value);
  };

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterExperience(e.target.value);
  };

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterCompany(e.target.value);
  };

  const handleTechStackChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterTechStack(e.target.value);
  };

  const handleRemoteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('remote change',e.target.value)
    setFilterRemote(e.target.value);
  };

  const handleMinBasePayChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterMinBasePay(e.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: "40px",
          gap: "10px",
        }}
      >
        <TextField
          type="text"
          name="role"
          label="Role"
          variant="outlined"
          value={filterRole}
          onChange={handleRoleChange}
        />
        <TextField
          type="text"
          name="location"
          label="Location"
          variant="outlined"
          value={filterLocation}
          onChange={handleLocationChange}
        />
        <TextField
          select
          type="number"
          name="experience"
          label="Min Experience"
          variant="outlined"
          value={filterExperience}
          onChange={handleExperienceChange}
          style={{
            width:"160px"
          }}
        >
          <MenuItem value="">All</MenuItem>
          {[...Array(10)].map((_, index) => (
            <MenuItem key={index + 1} value={String(index + 1)}>{index + 1}</MenuItem>
          ))}
        </TextField>

        <TextField
          type="text"
          name="company"
          label="Company"
          variant="outlined"
          value={filterCompany}
          onChange={handleCompanyChange}
        />
        <TextField
          type="text"
          name="techStack"
          label="Tech Stack"
          variant="outlined"
          value={filterTechStack}
          onChange={handleTechStackChange}
        />
        <TextField
          select
          label="Remote"
          name="Remote"
          value={filterRemote}
          onChange={handleRemoteChange}
          variant="outlined"
          style={{
            width:"160px"
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="on-site">On-site</MenuItem>
        </TextField>
        <TextField
          type="number"
          name="minBasePay"
          label="Min Base Pay"
          variant="outlined"
          value={filterMinBasePay}
          onChange={handleMinBasePayChange}
        />
      </Box>
      <JobLists
        jobs={jobs}
        filterRole={filterRole}
        filterLocation={filterLocation}
        filterExperience={filterExperience}
        filterCompany={filterCompany}
        filterTechStack={filterTechStack}
        filterRemote={filterRemote}
        filterMinBasePay={filterMinBasePay}
      />
    </div>
  );
};

export default Filterbar;
