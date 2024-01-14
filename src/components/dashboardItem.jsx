import { Paper } from "@mui/material";

export default function DashboardItem(props) {
    return(
        <div>
            <Paper sx={{boxShadow:'none', height: '168px', width:'100%', backgroundColor:props.color}}>

            </Paper>
        </div>
    )
}