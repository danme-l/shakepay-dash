import React, {useEffect, useState} from 'react';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import priceData from '../static/data/btc_eth_cadRate.json';
import { Box } from '@mui/system';
import { Link } from '@mui/material';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaBitcoin} from 'react-icons/fa';
import { Grid } from '@mui/material'
import { CustomSPInfoTable } from './CustomSPInfoTable';
import { CryptoBuyChart } from './CryptoBuyChart';

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
        // i = row index to highlight
        highlight !== i ? setHighlight(i) : setHighlight(-1);
        return;
    }
 
    return (
        <Box  sx={{ flexGrow: 1, margin: 4 }}>
            <Grid container spacing={5} direction="row" justifyContent={'space-evenly'}>
                {/* GRID UPPER ROW - header and info box */}
                <Grid item xs={6}>
                    <Typography variant='h1' >Bitcoin <FaBitcoin/> </Typography>
                </Grid>
                <Grid item xs={4} margin={1}>
                    <Paper elevation={3} sx={{padding:3}} >
                        <Typography variant='body1'>
                            Bitcoin is an open-source, uncensorable, decentralized, peer-to-peer payment system, 
                            invented anonymously by Satoshi Nakomoto, who's identity remains a mystery. 
                        </Typography>
                        <ul>
                            <li>
                                <Link href='bitcoin.org' target="_blank" rel="noreferrer">
                                    <Typography variant='body1'>Bitcoin.org <BsFillArrowRightCircleFill /> </Typography>
                                </Link>
                            </li>
                            <li>
                                <Link href='https://bitcoin.org/bitcoin.pdf' target="_blank" rel="noreferrer">
                                    <Typography variant='body1'>Whitepaper <BsFillArrowRightCircleFill /> </Typography>
                                </Link>
                            </li>
                        </ul>
                    </Paper>
                </Grid>
                {/* END GRID UPPER ROW */}
                {/* GRID SECOND ROW - time series chart & purchases table */}
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
                    <CustomSPInfoTable 
                        data={btcBuys} 
                        highlight={highlight} 
                        fieldHeaders={['Date','Debit Amount', 'Debit Currency', 'Credit Amount', 'Credit Currency', 'Buy / Sell Rate']} 
                        fieldIndices={[ 1, 2, 3, 4, 5, 6]}
                    />
                </Grid>
                {/* END GRID SECOND ROW */}
                {/* GRID THIRD ROW - cashouts table */}
                <Grid item xs={12}>
                    <Typography variant='h4'>BTC Cashouts to Wallet</Typography>
                    <CustomSPInfoTable 
                        data={btcCashouts} 
                        fieldHeaders={['Date','Debit Amount', 'Debit Currency', 'Spot Rate', 'Source / Destination', 'Blockchain Transaction ID']} 
                        fieldIndices={[ 1, 2, 3, 8, 9, 10]}
                        btcOrEth={'btc'}
                        showBlockchain={true}
                    />
                </Grid>
            </Grid>          
        </Box>
    )
};