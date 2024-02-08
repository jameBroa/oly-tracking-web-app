
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import '../styles/dashboard.css';
import Linegraph from '../components/linegraph';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { motion } from "framer-motion"


export default function Snatch() {




    const location = useLocation();
    const navigate = useNavigate();


    const [userData, setUserData] = useState(location.state)
    console.log(userData[0].userID)
    const [addEntryToggle, setEntryToggle] = useState(false);

    const [entryValue, setEntryValue] = useState("");

    const changeValue = (e) => {
        setEntryValue(e.target.value)
    }

    const toggleAddEntry = (e) => { 
        console.log(addEntryToggle)
        setEntryToggle(!addEntryToggle)
    }

    const submitEntry = async (e) => {

        if(entryValue){

            setEntryToggle(!addEntryToggle)
            const params = {
                TableName: 'oly-tracking',
                // todo: change date to curent date, bug here
                Item: {
                    userID: userData[0].userID,
                    date: '31/12/23',
                    exercise: 'snatch',
                    weightlifted: entryValue
                },

            }

            var AWS = require('aws-sdk')
            AWS.config.update({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            region: 'eu-north-1', 
            })
            const docClient = new AWS.DynamoDB.DocumentClient();


        try {
            const data = await docClient.put(params).promise();
        } catch(error) {
                console.error(error)
            }
            
            navigate("/snatch")
        }
    }

    const goBack = (e) => {
        navigate("/")
    }


    return(
        <div className="bgDash">
            <Stack direction={"column"} mr={2} ml={2} pt={1} spacing={2} sx={{width:'full', height:'100%'}}>
    
                <Typography variant="h3" sx={{fontSize:'24px', color:'white', fontWeight:'300'}}>Oly Tracking</Typography>
                <motion.div
                    whileHover={{scale:1.025, x:[10]}}
                    initial={{x:0}}>
                    <Paper onClick={goBack}sx={{cursor:'pointer', height:'45px', width:'80px', borderRadius:'20px', background:'linear-gradient(90deg, #FC0063, #FF2E20)'}}>
                        <Stack direction="row" pl={1} sx={{height:'100%', width:'100%', alignItems:'center'}}>
                            <Typography sx={{color:'white'}}>Go Back</Typography>
                        </Stack>
                    </Paper>
                </motion.div>
                
                <Typography sx={{fontSize:'32px', color:'white', fontWeight:'300'}}>Snatch</Typography>
                <Paper sx={{height:'260px', width:'100%', background: 'linear-gradient(90deg, #FC0063, #FF2E20)', borderRadius:'20px'}}>
                    <Stack pt={0.5} direction="row" justifyContent={'space-between'}>
                        <Typography pl={2} sx={{color:'white', fontWeight:'300'}}>History</Typography>
                    </Stack>
                    <Stack direction="column" sx={{ height:'240px'}} alignItems="center" justifyContent="center">
                        <Linegraph data={userData} filter="snatch" color="#f00" />
                    </Stack>
                </Paper>

                <Stack direction="row" justifyContent="space-between">
                    <motion.div animate={{
                        y:[100, 0], 
                        y: addEntryToggle ? 0:0,
                        width: addEntryToggle ? 270 : 134
                        
                        
                        }} whileHover={{scale:1.1}}>
                    <Paper onClick={toggleAddEntry} sx={{height:'75px', cursor:'pointer', background: 'linear-gradient(90deg, #FC0063, #FF2E20)', borderRadius:'20px'}}>
                        <Stack direction="row" sx={{width:'full', height:'75px'}} alignItems={"center"} justifyContent={"center"}>
                            {addEntryToggle && (
                                <TextField onChange={changeValue} sx={{input: {color:'white'}}}/>
                            )}
                            {!addEntryToggle && (
                                 <Typography sx={{color:'white'}}>+ Add Entry</Typography>
                            )}
                        </Stack>
                    </Paper>
                    </motion.div>
                    <motion.div animate={{
                        y:[100, 0], 
                        y: addEntryToggle ? 0:0,
                        width: addEntryToggle ? 75 : 208
                        
                        }} whileHover={{scale:1.1}}>
                    <Paper sx={{height:'75px', background: 'linear-gradient(90deg, #FC0063, #FF2E20)', borderRadius:'20px'}}>
                        <Stack direction="column" sx={{width:'full', height:'75px'}} alignItems={"center"} justifyContent={"center"}>
                            {addEntryToggle && (
                                <Typography onClick={submitEntry} sx={{color:'white'}}>Submit</Typography>

                            )}
                            {!addEntryToggle && (
                                <Typography sx={{color:'white'}}>+ Add Goal</Typography>
                            )}
                        </Stack>
                    </Paper>
                    </motion.div>
                </Stack>
                <Paper sx={{height:'260px', width:'100%', background: 'linear-gradient(90deg, #FC0063, #FF2E20)', borderRadius:'20px'}}>
                    <Stack pt={0.5} direction="row" justifyContent={'space-between'}>
                        <Typography pl={2} sx={{color:'white', fontWeight:'300'}}>Table of contents</Typography>
                    </Stack>
                    <Stack direction="column" sx={{ height:'240px'}} alignItems="center" justifyContent="center">
                        {/* <Linegraph data={userData} filter="cj" color="#0f0" /> */}
                        <Typography sx={{color:'white'}}>coming soon!</Typography>
                    </Stack>
                </Paper>
            </Stack>
        </div>
    )
}