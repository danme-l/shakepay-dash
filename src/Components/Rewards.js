import { Box } from "@mui/system"
import { Grid, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"
import { CardPurchaseTable } from "./CardPurchaseTable"

export const Rewards = ({cardPurchases, cardCashbacks, spEarn}) => {
    const [locations, setLocations] = useState([]);
    const [locationCounts, setLocationCounts] = useState({});

    useEffect(() => {
        // probably not the best way of doing this but it's way that works
        const locationCountsObj = cardPurchases
            .map(function(d) { return d['Source / Destination']; }) // array of locations 
            .reduce((acc, val) => {                                 // reduce to count the occurances of each
                acc[val] = ++acc[val] || 1;
                return acc;
        }, {});
        
        // recharts friendly format
        const temp = [];
        for (let key in locationCountsObj) {
            if (locationCountsObj[key] > 1) {
                temp.push({"location": key, "numPurchases": locationCountsObj[key]})
            };            
        };
        setLocationCounts(temp);
    }, [cardPurchases]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={4} sx={{p: 6, mx: 2}}>
                <Typography variant="h2">Card Purchases</Typography>
                <CardPurchaseTable data={cardPurchases} />
            </Grid>
            <Grid item xs={5} sx={{p: 6}}>
                <Typography variant="h6">Where you've used your card:</Typography>
                {/* TODO Bar Chart needs a ton of work */}
                <BarChart
                    width={700}
                    height={500}
                    data={locationCounts}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="numPurchases" fill="#8884d8" />
                    </BarChart>
            </Grid>
            
        </Grid>
    )
}