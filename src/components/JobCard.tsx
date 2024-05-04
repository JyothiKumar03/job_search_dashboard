import {useState} from "react"
import {Card, CardContent, Typography, Button, Collapse} from "@mui/material"


const JobCard = ({job} : {job:any}) => {
    const [showMoreDescription, setshowMoreDescription] = useState(false);
    const maxDescriptionLenght = 150;

    return(
        <Card className="job-card">
            <CardContent>
                <Typography variant="h6" className="job-title">
                    {job.jobRole}
                </Typography>
                <Typography variant="body1" className="location">
                    {job.company} {job.location}
                </Typography>
                <Typography variant="body2">
                    Estimated Salary : ${job.minJdSalary ? `${job.minJdSalary}000` : "NA"}{" "} - ${job.maJdSalary ? job.maxJdSalary : "NA"}0000✅
                </Typography>
                <Typography>About Company:</Typography>
                <Collapse in={showMoreDescription} timeout="auto" unmountOnExit>
                    <Typography variant="body2" paragraph>
                        {job.jobDetailsFromCompany}
                    </Typography>
                </Collapse>
                <Typography variant="body2" paragraph>
                    {job.jobDetailsFromCompany.substring(0,maxDescriptionLenght)};
                    {job.jobDetailsFromCompany.length > maxDescriptionLenght && (
                        <span onClick={() => setshowMoreDescription(!showMoreDescription)} style={{color: "blue", cursor : "pointer"}}>
                            {showMoreDescription ? "Read Less...." : "Read More...."}
                        </span>
                    )}
                </Typography>
                <Typography variant="body2" style={{marginBottom : "10px"}}>
                    Experience: {job.minExp ? job.minExp : "NA"} years
                </Typography>
                <Button variant="contained" color="primary" href={job.jdLink} className="apply-button">
                    ⚡Easy Apply 
                </Button>
            </CardContent>
        </Card>
    )
}

export default JobCard