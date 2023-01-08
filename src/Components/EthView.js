import React, {useEffect, useState} from 'react';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import priceData from '../static/data/btc_eth_cadRate.json';
import { Box } from '@mui/system';
import { Grid } from '@mui/material'
import { CryptoBuyTable } from './CryptoBuyTable';
import { CryptoBuyChart } from './CryptoBuyChart';
import { CryptoCashoutTable } from './CryptoCashoutTable';

export const EthView = ( {ethBuys, ethCashouts} ) => {
    const [firstBuy, setFirstBuy] = useState(ethBuys[0]['Date'].slice(0,10));
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
                    <Typography variant='h1' >Ether</Typography>
                </Grid>
                <Grid item xs={7}>
                    {/* TODO implement skip to the right table page on chart ref dot click */}
                    <CryptoBuyChart 
                        priceData={data} 
                        buysData={ethBuys} 
                        mouseOverDot={mouseOverDot} 
                        setMouseOverDot={setMouseOverDot}
                        highlightBuy={highlightBuy} 
                        btcOrEth='eth' />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant='h4'>ETH Buys</Typography>
                    <CryptoBuyTable data={ethBuys} highlight={highlight} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h4'>ETH Cashouts to Wallet</Typography>
                    <CryptoCashoutTable data={ethCashouts} highlight={highlight} btcOrEth='eth' />
                </Grid>
            </Grid>          
        </Box>
    )
};