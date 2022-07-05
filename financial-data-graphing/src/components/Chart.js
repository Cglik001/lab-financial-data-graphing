import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const Chart = () => {
    const [labels, setLabels] = useState([])
    const [dataValues, setDataValues] = useState([])
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const data = {
        labels,
        datasets: [{
            label: 'dataset 1',
            data: dataValues,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }],
    }
    useEffect(()=>{
        makeRequest('http://api.coindesk.com/v1/bpi/historical/close.json')
    },[])
    const makeRequest = (URL) => {
        axios.get(URL)
        .then( (response) => {
            setLabels([...Object.keys(response.data.bpi)])
            setDataValues([...Object.values(response.data.bpi)])
            })
        .catch((err)=>{
            console.log(err)
        })
    }
    const clickHandler = () =>{
        makeRequest(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=USD`)
    }
    const changeFromDateHandler = (event) =>{
        setFromDate(event.target.value)
    }
    const changeToDateHandler = (event) =>{
        setToDate(event.target.value)
    }
    return(
        <div>
            <div className='date-filters'>
                <input id='from-date' type='date' onChange={changeFromDateHandler} value={fromDate} />
                <input id='to-date' type='date' onChange={changeToDateHandler} value={toDate}  />
                <button onClick={clickHandler}>Update Chart</button>
            </div>
            <Line
                data={data}
            />
        </div>
    )
}
export default Chart;
