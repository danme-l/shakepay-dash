import { LineChart, XAxis, YAxis, Line, Tooltip, ReferenceDot, ResponsiveContainer } from 'recharts';
import { theme } from '../theme';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import moment from 'moment';


const CustomTooltip = ({ active, payload, btcOrEth}) => {
    if (active && payload) {
        return (
            <Paper elevation={4} sx={{padding: 1}}>
                <Typography variant='body1'>{moment(payload[0].payload['Date']).format('MMM DD, YYYY')}</Typography>
                {btcOrEth === 'btc' 
                    ? <Typography variant='body1'>${payload[0].payload['BTC'].toFixed(2)}</Typography> 
                    : btcOrEth === 'eth' ? <Typography variant='body1'>${payload[0].payload['ETH'].toFixed(2)}</Typography> : 0}
                
            </Paper>
        )
    };
    return null;        
  }

export const CryptoBuyChart = ({ priceData, buysData, mouseOverDot, setMouseOverDot, highlightBuy, btcOrEth}) => {
    return (
        <ResponsiveContainer width={'99%'} height={600}>
            <LineChart width={'99%'} data={priceData} margin={{ top: 50, right: 30, left: 30, bottom: 30}}>
                <Tooltip content={<CustomTooltip btcOrEth={btcOrEth}/>}/>
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
                {btcOrEth === 'btc' 
                    ? <Line type={"monotone"} dataKey="BTC" />
                    : btcOrEth === 'eth' ? <Line type={"monotone"} dataKey="ETH" /> : 0}

                {/* TODO
                Currently trying to figure out how to make these reference dots work 
                such that only one will expand when you mouse over it
                */}
                {/* Mark each of the user's buys on the price time series */}
                {buysData.map((d,i) => {
                    const v = Object.values(d);
                    return (
                        <ReferenceDot 
                            key={i} id={i} 
                            x={new Date(v[1].slice(0,10)).getTime()} 
                            y={v[6]}
                            r={mouseOverDot ? 8 : 4}
                            onMouseOver={(e) => setMouseOverDot(true)}
                            onMouseLeave={(e) => setMouseOverDot(false)}
                            onClick={(e) => highlightBuy(e.id)}
                            fill={theme.palette.secondary.main}
                            />
                    )
                })}                        
            </LineChart>
        </ResponsiveContainer>
    )
}