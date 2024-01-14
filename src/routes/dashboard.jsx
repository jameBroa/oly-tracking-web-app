import { Box, Button, Paper, Stack, Typography, makeStyles } from "@mui/material";
import '../styles/dashboard.css';
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Linegraph from "../components/linegraph";

export default function Dashboard() {

    const location = useLocation();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(location.state)


    const navigateCj = (e) => {
        navigate("/cj", {state: userData})
    }
    const navigateSnatch = (e) => {
        navigate("/snatch", {state: userData})
    }

    const navigateGs = (e) => {
        navigate("/gs", {state: userData})
    }

    const navigateGoals = (e) => {
        navigate("/goals", {state: userData})
    }




    return(
        <div class="bgDash">
            <Stack direction={"column"} mr={2} ml={2} pt={1} spacing={2} sx={{width:'full', height:'844px'}}>
                <Typography variant="h3" sx={{fontSize:'24px', color:'white', fontWeight:'300'}}>Oly Tracking</Typography>
                <Typography sx={{fontSize:'32px', color:'white', fontWeight:'300'}}>Dashboard</Typography>
                <Paper sx={{height:'168px', width:'100%', background: 'linear-gradient(90deg, #9469FF, #3968FE)', borderRadius:'20px'}}>
                    <Stack pt={0.5} direction="row" justifyContent={'space-between'}>
                        <Typography pl={2} sx={{color:'white', fontWeight:'300'}}>Clean and Jerk</Typography>
                        <Typography onClick={navigateCj} pr={2} sx={{color:'white', fontWeight:'300'}}>View more →</Typography>
                    </Stack>
                    <Stack pl={2} direction="column" sx={{height:'142px'}}>
                        <Linegraph data={userData} filter="cj" color="#0f0" />
                    </Stack>
                </Paper>
                <Paper sx={{height:'168px', width:'100%', background: 'linear-gradient(90deg, #FC0063, #FF2E20)', borderRadius:'20px'}}>
                    <Stack pt={0.5} direction="row" justifyContent={'space-between'}>
                        <Typography pl={2} sx={{color:'white', fontWeight:'300'}}>Snatch</Typography>
                        <Typography pr={2} sx={{color:'white', fontWeight:'300'}}>View more →</Typography>
                    </Stack>
                    <Stack pl={2} direction="column" sx={{height:'142px'}}>
                        <Linegraph data={userData} filter="snatch" color="#f00"/>
                    </Stack>
                </Paper>
                <Paper sx={{height:'168px', width:'100%', background: 'linear-gradient(90deg, #51E3F6, #9E50FE)', borderRadius:'20px'}}>
                    <Stack pt={0.5} direction="row" justifyContent={'space-between'}>
                        <Typography pl={2} sx={{color:'white', fontWeight:'300'}}>General Strength</Typography>
                        <Typography pr={2} sx={{color:'white', fontWeight:'300'}}>View more →</Typography>
                    </Stack>
                    <Stack pl={2} direction="column" sx={{height:'142px'}}>
                        <Linegraph data={userData} filter="cj" color="#00f" />
                    </Stack>
                </Paper>

                <Paper sx={{height:'168px', width:'100%', background: 'linear-gradient(90deg, #F14F1C, #FE50D8)', borderRadius:'20px'}}>
                    <Stack pt={0.5} direction="row" justifyContent={'space-between'}>
                        <Typography pl={2} sx={{color:'white', fontWeight:'300'}}>Goals</Typography>
                        <Typography pr={2} sx={{color:'white', fontWeight:'300'}}>View more →</Typography>
                    </Stack>
                    <Stack pl={2} direction="column" sx={{height:'142px'}}>
                        <Linegraph data={userData} filter="cj" color="#00f" />
                    </Stack>
                </Paper>
            </Stack>
        </div>
    )
}