import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './sip_cals.css';

export default function Sip_calc() {
    const [doughnutData, setDoughnutData] = useState({});
    const [amount, setAmount] = useState(100);
    const [returnInterest, setReturnInterest] = useState(1);
    const [period, setPeriod] = useState(1);
    const [estReturn, setEstReturn] = useState(1206);
    const [futureValue, setFutureValue] = useState(1206);
    const i = (returnInterest/100)/12;
    let invested_amount = amount * period * 12;
    const doughnutChart = () => {
        setDoughnutData({
            labels: [
                'Invested Amount',
                'Estimated Returns'
            ],
            label: 'Doughnut',
            datasets: [{
                data: [invested_amount, estReturn],
                backgroundColor: [
                    'rgba(80,81,96,.70)',
                    'rgba(111,185,143,.8)'
                ],
                hoverOffset: 4
            }]
        })
    }

    useEffect(() => {
        doughnutChart();
        sipCalculator();
    }, [amount, estReturn,period,returnInterest])

    let sipCalculator = () => {
        const total = amount*((Math.pow(1+i, period*12)-1)/i)*(1+i)
        setEstReturn(total-invested_amount)
        setFutureValue(total)
    }

    let amount_slider = (e) =>{
        setAmount(e.target.value)
        sipCalculator();
    }

    let interest_slider = (e) => {
        setReturnInterest(e.target.value)
        sipCalculator();
    }

    let period_slider = (e) => {
        setPeriod(e.target.value)
        sipCalculator();
    }
    
    return (
        <div className="background">
            <div className="layout">
                <div className="calculator-title">
                    SIP Calculator
                </div>
                <div className="main-container">
                    <div>
                        <label className="label">Monthly Investment</label>
                        <label className="label-bold"> &#8377; {amount}</label>
                        <input className="slider" type="range" step="500" min="500" max="200000" value={amount} onChange={amount_slider}/>
                    </div>
                    <div>
                        <label className="label">Expected Returns</label>
                        <label className="label-bold">{returnInterest} %</label>
                        <input className="slider" type="range" step="0.5" min="1" max="40" value={returnInterest} onChange={interest_slider} />
                    </div>
                    <div>
                        <label className="label">Time Period</label>
                        <label className="label-bold">{period} Years</label>
                        <input className="slider" type="range" step="1" min="1" max="40" value={period} onChange={period_slider} />
                    </div>
                </div>
                <div className="size-200">
                <Doughnut
                    data={doughnutData}
                    width={10}
                    height={10}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true
                    }}
                />
                </div>
                <br></br>
                <br></br>
                <div className="output">
                    <div>
                        <label className="fs-14">Invested Amount</label>
                        <p className="fs-24 up">&#8377; {invested_amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                        <label className="fs-14">Estimated Returns</label>
                        <p className="fs-24 up">&#8377; {estReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                </div>
                <div className="output">
                    <div>
                        <label className="fs-14 center">Total Value</label>
                        <p className="fs-24 up">&#8377; {futureValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
