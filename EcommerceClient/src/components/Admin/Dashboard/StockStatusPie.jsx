import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const StockStatusPie = () => {

    const [status, setStatus] = useState([])

    const [options, setOptions] = useState({})

    
    useEffect(() => {
        async function getTransactionData(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stock-details`)
                const {data} = response
                if(data.success){

                    setStatus(Object.values(data.data))
                    setOptions({
                        chart: {
                          type: 'donut',
                        },
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            text: 'Stock Availability',
                            align: 'left'
                        },
                        responsive: [{
                            breakpoint: 320,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }],
                        labels: ['Available', "Not Available"],
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }

        getTransactionData()
    }, [])

    return (
        <>
            <div id="chart">
                <ReactApexChart options={options} series={status} type="donut" />
            </div>
            <div id="html-dist"></div>
        </>
    )
}

export default StockStatusPie