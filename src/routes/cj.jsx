
import { Paper, Stack, Typography } from '@mui/material';
import '../styles/dashboard.css';
import Linegraph from '../components/linegraph';
import { useLocation } from 'react-router';
import { useState } from 'react';


export default function Cj() {

    const location = useLocation();

    const [userData, setUserData] = useState(location.state)


    return(
        <div className="bgDash">
            <Stack direction={"column"} mr={2} ml={2} pt={1} spacing={2} sx={{width:'full', height:'844px'}}>
                <Typography variant="h3" sx={{fontSize:'24px', color:'white', fontWeight:'300'}}>Oly Tracking</Typography>
                <Typography sx={{fontSize:'32px', color:'white', fontWeight:'300'}}>Clean and Jerk</Typography>
                <Paper sx={{height:'260px', width:'100%', background: 'linear-gradient(90deg, #9469FF, #3968FE)', borderRadius:'20px'}}>
                    <Stack pt={0.5} direction="row" justifyContent={'space-between'}>
                        <Typography pl={2} sx={{color:'white', fontWeight:'300'}}>History</Typography>
                    </Stack>
                    <Stack direction="column" sx={{ height:'240px'}} alignItems="center" justifyContent="center">
                        <Linegraph data={userData} filter="cj" color="#0f0" />
                    </Stack>
                </Paper>

                <Stack direction="row" justifyContent="space-between">
                    <Paper sx={{height:'75px', width:'134px', background: 'linear-gradient(90deg, #9469FF, #3968FE)', borderRadius:'20px'}}>
                        <Stack direction="column" sx={{width:'full', height:'75px'}} alignItems={"center"} justifyContent={"center"}>
                            <Typography sx={{color:'white'}}>Add Entry</Typography>
                        </Stack>
                    </Paper>

                    <Paper sx={{height:'75px', width:'208px', background: 'linear-gradient(90deg, #9469FF, #3968FE)', borderRadius:'20px'}}>
                        <Stack direction="column" sx={{width:'full', height:'75px'}} alignItems={"center"} justifyContent={"center"}>
                            <Typography sx={{color:'white'}}>Add Goal</Typography>
                        </Stack>
                    </Paper>


                </Stack>


            </Stack>
        </div>
    )
}