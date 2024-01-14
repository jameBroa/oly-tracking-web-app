import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";


export default function Linegraph(props) {

    // props.data.sort(function(a, b) {
    //     let dateA = new Date(a.date);
    //     console.log(dateA)
    //     let dateB = new Date(b.date)

    //     return dateA - dateB
    // })

//    props.data.map((data) => {
//     console.log(data.date + ", " + data.weightlifted)
//    })

    

    

   


    const [userData, setUserData] = useState({
        labels: props.data.map((data) => data.date),
        datasets: [{
            label: "Date",
            data: props.data.map((data) => data.weightlifted),

        }]
    })

    const options = {
        scales: {
            x:{
                grid:{
                    display:false,
                    drawBorder:false,
                },
                ticks:{
                    display:false,
                }
            },
            y:{
                grid:{
                    display:false,
                },
                ticks:{
                    display:false,
                }
            }
        },
        plugins: {
            customCanvasBackgroundColor:{
                color:'#fff'
            },
            title:{
                display:false,
                text:'Snatch history',
                fontSize:16,
            },
            legend:{
                display:false,
            },
                
        }
    }
    


    useEffect(() => {
        // Use useEffect to update the userData when props.data changes
        const exerciseFilter = props.data.filter((item) => {
            return item.exercise === props.filter
        });
        console.log(exerciseFilter)
        setUserData({
            labels: exerciseFilter.map(data => data.date),
            datasets: [{
                label: "WeightLifted",
                data: exerciseFilter.map(data => data.weightlifted),
                backgroundColor: props.color,
                borderColor: '#fff',
            }]
        });
    }, [props.data]);

    return(
        <Line options={options} data={userData}/>
    )
}
