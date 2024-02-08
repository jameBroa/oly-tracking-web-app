import { Box, Button, Input, Stack, TextField, Typography } from "@mui/material";
import '../styles/loginpage.css';
import { motion } from "framer-motion"
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {createStore} from 'react-redux';
import {addUser} from '../actions/userActions';


export default function Loginpage() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)




    var AWS = require('aws-sdk')
    AWS.config.update({
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
          region: 'eu-north-1', 
    })
    const docClient = new AWS.DynamoDB.DocumentClient();

    


    const [loginClicked, setLoginClicked] = useState(false);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    const reducer = (state = null, action) => {
        switch(action.type){
            case 'ADD_USER':
                return userId
            default:
                return userId
        }
    }

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);

    }

    const handleLoginClick = () => {
        setLoginClicked(true)
        
    }

    function checkIfUserExists(userId){
        console.log('hello world')
        console.log(process.env.REACT_APP_AWS_ACCESS_KEY_ID +" id")
        const params = {
            TableName: 'oly-tracking',
            KeyConditionExpression: 'userID = :userId',
            ExpressionAttributeValues: {
                ':userId': parseInt(userId),
            },
        };
        docClient.query(params, (err, data) => {
            if (err) {
              console.error('Error querying data:', err);
            } else {
              if (data.Items.length > 0) {
                console.log(`Entry for User ID ${userId} exists.`);
                console.log(data.Items)
                dispatch(addUser(userId))
                navigate("/dashboard", {state: data.Items})
              } else {
                console.log(`No entry found for User ID ${userId}.`);
              }
            }
          });
    }


    const loginPress = () => {
        handleLoginClick()
        if(userId){
            checkIfUserExists(userId)
            
        }

    }

    const registerPress = () => {

    }
    
    return(
        <div class='bg'>
            <Stack ml={2} mr={2} spacing={10} sx={{width:'full', height:'844px'}} alignItems="center" justifyContent="center">
                <motion.div animate={{ scale:[0.25,1] }}>
                    <Typography variant="h3" sx={{textAlign:'center', color:'white', fontWeight:'300', fontSize:'42px'}}>Welcome to the Weightlifting tracking Web App!</Typography>
                </motion.div>
                <Stack direction="column" spacing={2}>
                    <motion.div animate={{y:[100, 0], y: loginClicked ? 100:0}} whileHover={{scale:1.1}}>
                        <Button onClick={loginPress} disableElevation disableTouchRipple disableRipple variant="text" sx={{
                            width:'280px', borderRadius:'20px', textTransform:'none', backgroundColor:'white', boxShadow:'none', border:1, borderWidth:'2px', borderColor:'black',
                            ':hover':{
                                backgroundColor:'#fff'
                            },
                            ':active': {
                                bgcolor:'white'
                            }}}>
                            <Typography sx={{color:'black'}}>Login</Typography>
                        </Button>
                    </motion.div>
                    <motion.div animate={{y:[100, 0], y: loginClicked ? 100:0}} transition={{delay:0.01}} whileHover={{scale:1.1}}>
                        <Button onClick={registerPress} disableElevation disableTouchRipple disableRipple variant="text" sx={{
                            width:'280px', borderRadius:'20px', textTransform:'none', backgroundColor:'white', boxShadow:'none', border:1, borderWidth:'2px', borderColor:'black',
                            ':hover':{
                                backgroundColor:'#fff'
                            },
                            ':active': {
                                bgcolor:'white'
                            }}}>
                            <Typography sx={{color:'black'}}>Register</Typography>
                        </Button>
                    </motion.div>
                </Stack>
                <motion.div initial={{x:-500, y:-200}} animate={{x: loginClicked ? 0:-500}}>
                    <TextField onChange={handleUserIdChange} inputProps={{style:{color:'white'}}} variant="filled" label="Enter your user id" sx={{color:'white'}}></TextField>
                </motion.div>

            </Stack>
        </div>
    )
}