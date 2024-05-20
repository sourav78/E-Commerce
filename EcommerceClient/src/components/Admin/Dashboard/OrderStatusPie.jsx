import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const OrderStatusPie = () => {

    const [statusCount, setStatusCount] = useState([])

    const [options, setOptions] = useState({})

    const option = {
        chart: {
            width: 380,
            type: 'pie',
        },
        title: {
            text: 'Top countries',
            align: 'left'
        },
        labels: ['Shipped', 'canceled', 'Delivered', 'Processing'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    useEffect(() => {
        async function getTransactionData(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/all-order-status`)
                const {data} = response
                if(data.success){
                    const count = data.data.map(status => {
                        return status.count
                    })
                    const stats = data.data.map(status => {
                        return status.status
                    })

                    setStatusCount(count)
                    setOptions({
                        chart: {
                            width: 380,
                            type: 'pie',
                        },
                        title: {
                            text: 'Order Status',
                            align: 'left'
                        },
                        labels: stats,
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
                        }]
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
                <ReactApexChart options={options} series={statusCount} type="pie" />
            </div>
            <div id="html-dist"></div>
        </>
    )
}

export default OrderStatusPie