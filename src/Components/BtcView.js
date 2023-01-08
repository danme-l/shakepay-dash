import React, {useEffect, useState} from 'react';
import { LineChart, XAxis, YAxis, Line, Tooltip, Cross, ReferenceDot, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import priceData from '../static/data/btc_eth_cadRate.json';
import moment from 'moment';
import { theme } from '../theme';


export const BtcView = ( {btcBuys} ) => {
    const [firstBuy, setFirstBuy] = useState(btcBuys[0]['Date'].slice(0,10));
    const [data, setData] = useState([]);
    const [mouseOverDot, setMouseOverDot] = useState(false);

    useEffect(() => {
        // use data only from 1 month before the user's first buy
        let sortedData = priceData.sort((a,b) => new Date(a['Date']) - new Date(b['Date']));
        let fb = new Date(firstBuy);
        fb.setMonth(fb.getMonth() - 1);
        setData(sortedData.filter(d => new Date(d.Date) > fb));
    }, []);

    const highlightBuy = () => {
        return;
    }

    const CustomTooltip = ({ active, payload}) => {
        if (active && payload) {
            return (
                <Paper elevation={4} sx={{padding: 1}}>
                    <Typography variant='body1'>{moment(payload[0].payload['Date']).format('MMM DD, YYYY')}</Typography>
                    <Typography variant='body1'>${payload[0].payload['BTC'].toFixed(2)}</Typography>
                </Paper>
            )
        };
        return null;        
      }
  
    return (
        <div>
            <LineChart width={1000} height={700} data={data} margin={{ top: 50, right: 30, left: 30, bottom: 30}}>
                <Tooltip content={CustomTooltip}/>
                <XAxis
                    dataKey = 'Date'   
                    domain = {['dataMin', 'dataMax']}
                    angle={45} tickCount={25} tickMargin={20}
                    tickFormatter = {(unixTime) => moment(unixTime).format('DD-MM-YYYY')}
                    type = 'number'
                    style={{
                        fontSize: '0.9em',
                        fontFamily: theme.typography.fontFamily
                    }}
                    label={{ 
                        value: 'Date', 
                        position: 'insideBottomRight', 
                        offset: 40,
                        fontFamily: theme.typography.fontFamily }}
                />
                <YAxis
                    tickCount={16} 
                    label={{ 
                        value: 'Exchange Rate, CAD', 
                        angle: -90, 
                        position: 'insideLeft', 
                        offset: -10,
                        fontFamily:theme.typography.fontFamily }}
                    style={{
                        fontSize: '0.9em',
                        fontFamily: theme.typography.fontFamily
                    }}
                />
                <Line type={"monotone"} dataKey="BTC" />

                {/* TODO
                Currently trying to figure out how to make these reference dots work 
                such that only one will expand when you mouse over it
                */}
                {/* Mark each of the user's buys on the price time series */}
                {btcBuys.map((d,i) => {
                    const v = Object.values(d);
                    return (
                        <ReferenceDot 
                            key={i} 
                            x={new Date(v[1].slice(0,10)).getTime()} 
                            y={v[6]}
                            r={mouseOverDot ? 8 : 4}
                            onMouseOver={(e) => setMouseOverDot(true)}
                            onMouseLeave={(e) => setMouseOverDot(false)}
                            onClick={highlightBuy()}
                            fill={theme.palette.primary.dark}
                            />
                    )
                })}
                
            </LineChart>
        </div>
    )
}