import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';


const TransactionLineChart = () => {

    const [transactionDates, setTransactionDates] = useState([])

    const [series, setSeries] = useState([])

    const [options, setOptions] = useState({})

    useEffect(() => {
        async function getTransactionData(){
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/total-transaction-amount`)
                const {data} = response
                if(data.success){
                    let lastDateLine = 1
                    let lastAmountLine = 1
                    const dates = data.data.reverse().map(date => {
                        if(lastDateLine <= 7){
                            lastDateLine += 1
                            return date.date
                        }
                    }).filter(item => item !== undefined)

                    const amounts = data.data.reverse().map(date => {
                        if(lastAmountLine <= 7){
                            lastAmountLine += 1
                            return date.totalAmount
                        }
                    })

                    setTransactionDates(dates.reverse())
                    setSeries([
                        {
                            name: "Total Amount",
                            data: amounts
                        }
                    ])
                }
            } catch (error) {
                console.log(error);
            }
        }

        getTransactionData()
    }, [])

    useEffect(() => {
        const option = {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Last 7 days Transaction',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: transactionDates,
                title: {
                    text: 'Transaction Dates'
                }
            },
            yaxis: {
                title: {
                  text: 'Amounts'
                }
            },
        };

        setOptions(option);
    }, [transactionDates]);

    return (
        <>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
        </>
    )
}

export default TransactionLineChart