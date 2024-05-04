import  {useState} from "react";
import { UseSelector, useSelector } from "react-redux";
import JobLists from "./JobLists";
import {Box, TextField} from "@mui/material"

const Filterbar = () => {
    const jobs = useSelector((state : any) =>{ 
        console.log(state);
        state.jobData.jobData})
    const  [filterRole, setFilterRole] = useState("");
    const [filterLocation, setFilterLocation] = useState("");
    const [filterExperience, setFilterExperience] = useState("");

    const handleRoleChange = (e:any)=>{
        setFilterRole(e.target.value);
    }
    const handleLocationChange = (e:any)=>{
        setFilterLocation(e.target.value)
    }
    const handleExperienceChange = (e:any)=>{
        setFilterExperience(e.target.value);
    }


  return (
    <div>
        <Box
        sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: "40px",
            gap: "50px",
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
          type="number"
          name="experience"
          label="Min Experience"
          variant="outlined"
          value={filterExperience}
          onChange={handleExperienceChange}
        />
      
      </Box>
      <JobLists
        jobs={jobs}
        filterRole={filterRole}
        filterLocation={filterLocation}
        filterExperience={filterExperience}
      />
    </div>
  )
}

export default Filterbar