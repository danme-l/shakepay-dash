import { Box } from "@mui/system"
import { Grid, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { Tabs, Tab} from "@mui/material";
import { TabPanel } from "./Utils/TabPanel.js";
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
    const [tabIndex, setTabIndex] = useState(0)
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

    const handleChangeTab = (event, newTabInd) => {
        setTabIndex(newTabInd);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <Grid container spacing={1} justifyContent='center'>
            {/* GRID TOP ROW - purchases & purchase charts */}
            <Grid item xs={5} sx={{display:'flex', flexDirection:'column', justifyContent:'center', p: 6, mx: 1}}>
                <Typography variant="h2">Card Purchases</Typography>
                <CustomSPInfoTable data={cardPurchases} highlight={null} fieldHeaders={['Date', 'Amount Debited', 'Debit Currency', 'Source / Destination']} fieldIndices={[ 1, 2, 3, 9]} />
            </Grid>
            <Grid item xs={6} sx={{p: 6}}>
                <Typography variant="h4">Where you've used your card</Typography>
                {/* TODO Bar Chart needs a ton of work */}
                <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="tabs">
                    <Tab label="Bar Chart" {...a11yProps(0)} />
                    <Tab label="Pie Chart" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={tabIndex} index={0}>
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
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <ResponsiveContainer width={'100%'} height={500}>
                        <PieChart width={700} height={500}>
                            <Pie 
                                dataKey="numPurchases"
                                data={locationCounts} 
                                fill={theme.palette.primary.light}
                                label
                                />
                            <Tooltip content={<CustomTooltip />}/>
                        </PieChart>     
                    </ResponsiveContainer>
                </TabPanel>
            </Grid>
            {/* END GRID TOP ROW */}
            {/* GRID SECOND ROW - cash back */}
            <Grid item xs={5} sx={{p: 6, mx: 1}}>
                <Typography variant="h2">Cash back</Typography>
                <CustomSPInfoTable 
                        data={cardCashbacks} 
                        fieldHeaders={['Date','Credit Amount', 'Credit Currency', 'Spot Rate', 'Reward - CAD']} 
                        fieldIndices={[ 1, 4, 5, 8]}
                        calculateCadVal={true}
                    />
            </Grid>
            <Grid item xs={6} sx={{display:'flex',  flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <Paper elevation={3} sx={{p: 2, my: 2, minWidth:'70%'}}>
                    <Typography variant='h6'>Cashback Earned</Typography>
                    <Typography variant='body1'>
                        {cardCashbacks.reduce((t, d) => parseFloat(d['Amount Credited'])*100000000 + t, 0)} Satoshis
                    </Typography>
                </Paper>
                <Paper elevation={3} sx={{p: 2, my: 2, minWidth:'70%'}}>
                    <Typography variant='h6'>Biggest Cashback - Sats</Typography>
                    <Typography variant='body1'>
                        {cardCashbacks.reduce((t, d) => Math.max(t, parseFloat(d['Amount Credited'])*100000000), 0)} Satoshis
                    </Typography>
                </Paper>
                <Paper elevation={3} sx={{p: 2, my: 2, minWidth:'70%'}}>
                    <Typography variant='h6'>Biggest Cashback - CAD</Typography>
                    <Typography variant='body1'>
                        ${cardCashbacks.reduce((t, d) => Math.max(t, parseFloat(d['Amount Credited'])*d['Spot Rate']), 0).toFixed(2)}
                    </Typography>
                </Paper>
            </Grid> 
            {/* END GRID SECOND ROW */}
            {/* GRID THIRD ROW - earn rewards */}
            <Grid item xs={5} sx={{p: 6, mx: 1}}>
                <Typography variant="h2">Shakepay Earn</Typography>
                <CustomSPInfoTable 
                        data={spEarn} 
                        fieldHeaders={['Date','Credit Amount', 'Credit Currency', 'Spot Rate', 'Reward - CAD']} 
                        fieldIndices={[ 1, 4, 5, 8]}
                        calculateCadVal={true}
                    />
            </Grid>
            <Grid item xs={6} sx={{display:'flex',  flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <Paper elevation={3} sx={{p: 2, my: 2, minWidth:'70%'}}>
                    <Typography variant='h6'>Rewards Earned</Typography>
                    <Typography variant='body1'>
                        {spEarn.reduce((t, d) => parseFloat(d['Amount Credited'])*100000000 + t, 0)} Satoshis
                    </Typography>
                </Paper>
                <Paper elevation={3} sx={{p: 2, my: 2, minWidth:'70%'}}>
                    <Typography variant='h6'>Biggest Earn Reward - Sats</Typography>
                    <Typography variant='body1'>
                        {spEarn.reduce((t, d) => Math.max(t, parseFloat(d['Amount Credited'])*100000000), 0)} Satoshis
                    </Typography>
                </Paper>
                <Paper elevation={3} sx={{p: 2, my: 2, minWidth:'70%'}}>
                    <Typography variant='h6'>Biggest Earn Reward - CAD</Typography>
                    <Typography variant='body1'>
                        ${spEarn.reduce((t, d) => Math.max(t, parseFloat(d['Amount Credited'])*d['Spot Rate']), 0).toFixed(2)}
                    </Typography>
                </Paper>
            </Grid> 
        </Grid>
    )
}