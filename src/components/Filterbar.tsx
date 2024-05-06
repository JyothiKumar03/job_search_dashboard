import React, { useState, useRef, useEffect } from "react";
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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);


  const roleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const techStackRef = useRef<HTMLInputElement>(null);
  const remoteRef = useRef<HTMLInputElement>(null);
  const minBasePayRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    roleRef.current?.focus();
  }, []);

  
  const inputRefs = [roleRef, locationRef, experienceRef, companyRef, techStackRef, remoteRef, minBasePayRef];
  const inputLabels = ["Role", "Location", "Min Experience", "Company", "Tech Stack", "Remote", "Min Base Pay"];

  const handleFocusChange = (index: number) => {
    setFocusedIndex(index);
  };

  // Function to handle arrow key navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      const nextIndex = focusedIndex === null ? 0 : (focusedIndex + 1) % inputRefs.length;
      inputRefs[nextIndex]?.current?.focus();
      event.preventDefault(); // Prevent default behavior of arrow keys
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      const prevIndex = focusedIndex === null ? inputRefs.length - 1 : (focusedIndex - 1 + inputRefs.length) % inputRefs.length;
      inputRefs[prevIndex]?.current?.focus();
      event.preventDefault(); // Prevent default behavior of arrow keys
    }
  };

  
  
  


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

  //dynamic rendering of the components with keyboard accessibility
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
        {inputRefs.map((ref, index) => (
          <TextField
            key={index}
            type="text"
            name={`input-${index}`}
            label={inputLabels[index]}
            variant="outlined"
            value={index === 0 ? filterRole : index === 1 ? filterLocation : index === 2 ? filterExperience : index === 3 ? filterCompany : index === 4 ? filterTechStack : index === 5 ? filterRemote : filterMinBasePay}
            onChange={index === 0 ? handleRoleChange : index === 1 ? handleLocationChange : index === 2 ? handleExperienceChange : index === 3 ? handleCompanyChange : index === 4 ? handleTechStackChange : index === 5 ? handleRemoteChange : handleMinBasePayChange}
            inputRef={ref}
            onKeyDown={handleKeyDown}
            onFocus={() => handleFocusChange(index)} 
            style={index === 2 || index === 6 ? { width: "160px" } : index === 5 ? { width: "200px" } : {}}
            select={index === 2 || index === 5}
          >
            {index === 2 &&
              [<MenuItem key="all" value="">All</MenuItem>,
              [...Array(10)].map((_, i) => (
                <MenuItem key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </MenuItem>
              ))]}
            {index === 5 &&
              [<MenuItem key="all" value="">All</MenuItem>,
              <MenuItem key="remote" value="remote">Remote</MenuItem>,
              <MenuItem key="on-site" value="on-site">On-site</MenuItem>]}
          </TextField>
        ))}
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
}
  
export default Filterbar;
