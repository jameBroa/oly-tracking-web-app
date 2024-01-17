import { Box, Button, Input, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from 'chart.js/auto'
import { Line } from "react-chartjs-2";
import Linegraph from "../components/linegraph";


export default function Homepage() {

    

    var AWS = require('aws-sdk')
        AWS.config.update({
              accessKeyId: secret.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: secret.env.AWS_SECRET_ACCESS_KEY,
              region: 'eu-north-1', 
        })
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'})

    const docClient = new AWS.DynamoDB.DocumentClient();

    const [snatchDate, setSnatchDate] = useState();
    const [snatchAmt, setSnatchAmt] = useState();
    const [userInputId, setUserId] = useState();

    const [userData, setUserData] = useState([]);

    const [exercise, setExercise] = useState("");
    const [userUpdateId, setUserUpdateId] = useState("")

    const [graphVisibility, setGraphVisibility] = useState(false)

    const updateUserUpdateId = (e) => {
        setUserUpdateId(e.target.value);
    }

    const updateExercise = (e) => {
        setExercise(e.target.value)
    }

    const updateSnatchDate = (e) => {
        setSnatchDate(e.target.value)
    }

    const updateUserId = (e) => {
        setUserId(e.target.value)
    }

    const updateSnatchAmt = (e) => {
        setSnatchAmt(e.target.value);
    }

    function getHistory(userId){
        const params = {
            TableName:'oly-tracking',
            KeyConditionExpression: 'userID = :userId', //userID = DynamoDB name | userId = local variable here
            ExpressionAttributeValues: {
                ':userId': parseInt(userId),
            },
            ScanIndexForward: false,

        }

        docClient.query(params, (err, data) => {
            if(err){
                console.error(err)
            } else{
                console.log('it got here')
                console.log(data.Items)
                console.log('----')
                setUserData(data.Items.reverse())
            }
        })


    }

    function sortDataByDate() {
        setUserData(userData.sort(function(a,b) {
            let dateA = new Date(a.date);
            console.log(dateA)
            let dateB = new Date(b.date)
        return dateA - dateB
        }))
    }


    const getUserData = () => {
        getHistory(userInputId)
        setGraphVisibility(true)

    }

    function addRecord(userId, timestamp, exercise, weightlifted) {
        const params = {
            TableName: 'oly-tracking',
            Item: {
                'userID': parseInt(userId),
                'date': timestamp,
                'exercise': exercise,
                'weightlifted': parseInt(weightlifted)

            }
        }
        docClient.put(params, (err, data) => {
            if(err){
                console.error(err)
            } else {
                console.log("added: " + data)
            }
        })
    }

    const submitData = () => {
        addRecord(userUpdateId, snatchDate, exercise, snatchAmt);
    }
    

    

    return(
        <div>
            <Stack direction="column" spacing={2} sx={{width:'full'}} alignItems={"center"}>
                <Stack direction="row">
                    <Typography variant="p">Enter user id</Typography>
                    <Input onChange={updateUserId}></Input>
                    
                </Stack>
                <Button onClick={getUserData}><Typography variant="p">Click here to get user data</Typography></Button>
                <Stack direction="row">
                    <Typography variant="p">Enter Date</Typography>
                    <Input onChange={updateSnatchDate}></Input>
                </Stack>
                <Stack direction="row">
                    <Typography variant="p">Enter lift amount</Typography>
                    <Input onChange={updateSnatchAmt}></Input>
                </Stack>
                <Stack direction="row">
                    <Typography variant="p">Enter exercise</Typography>
                    <Input onChange={updateExercise}></Input>
                </Stack>
                <Stack direction="row">
                    <Typography variant="p">Enter user id to update</Typography>
                    <Input onChange={updateUserUpdateId}></Input>
                </Stack>
                <Button onClick={submitData}><Typography variant="p">Submit change</Typography></Button>
                {graphVisibility && (
                    <Box sx={{height:'500px', width:'700px'}}><Linegraph data={userData}/></Box>
                )}
            </Stack>
           

        </div>
    )
}