import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import {
    LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
const Charts = props => {
    const bills = useSelector((state) => {
        return state.user.bills.data
    })

    const [design, setDesign] = useState([])

    useEffect(() => {
        const result = bills.slice(-8).reverse().map((ele) => {
            return { date: ele.date.slice(0, 10), total: ele.total }
        })
        setDesign(result)
    }, [bills])


    console.log('in', design);


    const result = design.reduce((accumulator, cur) => {
        let date = cur.date;
        let found = accumulator.find(elem => elem.date == date)
        if (found) found.total += cur.total;
        else accumulator.push(cur);
        return accumulator;
    }, []);

    //console.log("out", result)

    return (
        <>
            <ResponsiveContainer width={'100%'} height={400}>
                <LineChart data={result}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="total" fill="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}
export default Charts