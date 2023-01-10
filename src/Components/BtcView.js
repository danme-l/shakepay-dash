import React, {useEffect, useState} from 'react';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import priceData from '../static/data/btc_eth_cadRate.json';
import { Box } from '@mui/system';
import { Grid } from '@mui/material'
import { CryptoBuyTable } from './CryptoBuyTable';
import { CryptoBuyChart } from './CryptoBuyChart';
import { CryptoCashoutTable } from './CryptoCashoutTable';

export const BtcView = ( {btcBuys, btcCashouts} ) => {
    const [firstBuy, setFirstBuy] = useState(btcBuys[0]['Date'].slice(0,10));
    const [data, setData] = useState([]);
    const [mouseOverDot, setMouseOverDot] = useState(false);
    const [highlight, setHighlight] = useState(-1);

    useEffect(() => {
        // use data only from 1 month before the user's first buy
        let sortedData = priceData.sort((a,b) => new Date(a['Date']) - new Date(b['Date']));
        let fb = new Date(firstBuy);
        fb.setMonth(fb.getMonth() - 1);
        setData(sortedData.filter(d => new Date(d.Date) > fb));
    }, []);

    const highlightBuy = (i) => {
        highlight !== i ? setHighlight(i) : setHighlight(-1);
        return;
    }
 
    return (
        <Box  sx={{ flexGrow: 1, margin: 4 }}>
            <Grid container spacing={5} direction="row" justifyContent={'space-evenly'}>
                <Grid item xs={12}>
                    <Typography variant='h1' >Bitcoin</Typography>
                </Grid>
                <Grid item xs={7}>
                    {/* TODO implement skip to the right table page on chart ref dot click */}
                    <CryptoBuyChart 
                        priceData={data} 
                        buysData={btcBuys} 
                        mouseOverDot={mouseOverDot} 
                        setMouseOverDot={setMouseOverDot}
                        highlightBuy={highlightBuy}
                        btcOrEth='btc' />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant='h4'>BTC Buys</Typography>
                    <CryptoBuyTable data={btcBuys} highlight={highlight} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h4'>BTC Cashouts to Wallet</Typography>
                    <CryptoCashoutTable data={btcCashouts} highlight={highlight} btcOrEth='btc' />
                </Grid>
            </Grid>          
        </Box>
    )
};