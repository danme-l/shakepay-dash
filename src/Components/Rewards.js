import { Box } from "@mui/system"
import { Grid, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"
import { CardPurchaseTable } from "./CardPurchaseTable"
import { CustomSPInfoTable } from "./CustomSPInfoTable"
import { useTheme } from "@mui/material"
import Paper from "@mui/material/Paper"

const CustomTooltip = ({ active, payload, btcOrEth}) => {
    if (active && payload) {
        return (
            <Paper elevation={4} sx={{padding: 1}}>
                <Typography variant='body1'>{payload[0].payload.location}</Typography>
                <Typography variant='body1'>{payload[0].payload.numPurchases} purchases</Typography>    
            </Paper>
        )
    };
    return null;        
  }

export const Rewards = ({cardPurchases, cardCashbacks, spEarn}) => {
    const [locations, setLocations] = useState([]);
    const [locationCounts, setLocationCounts] = useState({});

    const theme = useTheme();

    useEffect(() => {
        // probably not the best way of doing this but it's way that works
        // this produces an object in location: count format, which doesn't work for recharts
        const locationCountsObj = cardPurchases
            .map(function(d) { return d['Source / Destination'].replace(/\d+$/, ""); }) // array of locations, removing branch numbers with regex
            .reduce((acc, val) => {                                 // reduce to count the occurances of each location
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
        <Grid container spacing={1} justifyContent='center'>
            <Grid item xs={5} sx={{p: 6, mx: 1}}>
                <Typography variant="h2">Card Purchases</Typography>
                <CardPurchaseTable data={cardPurchases} />
            </Grid>
            <Grid item xs={6} sx={{p: 6}} alignItems='center'>
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
                    <XAxis dataKey="location"/>
                    <YAxis />
                    <Tooltip content={<CustomTooltip />}/>
                    <Bar dataKey="numPurchases" fill={theme.palette.primary.light}/>
                    </BarChart>
            </Grid>
            <Grid item xs={5} sx={{p: 6, mx: 1}}>
                <Typography variant="h2">Cash back</Typography>
                <CustomSPInfoTable data={cardCashbacks} fieldHeaders={['Date','Credit Amount', 'Spot Rate']} fieldIndices={[ 1, 4, 8]} />
            </Grid>
            <Grid item xs={6}>
                {/* <Typography variant="h2">Cash back</Typography> */}
            </Grid>           
        </Grid>
    )
}