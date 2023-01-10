import React, {useEffect, useState} from 'react';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import priceData from '../static/data/btc_eth_cadRate.json';
import { Box } from '@mui/system';
import { Link } from '@mui/material';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaBitcoin} from 'react-icons/fa';
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
                <Grid item xs={6}>
                    <Typography variant='h1' >Bitcoin <FaBitcoin/> </Typography>
                </Grid>
                <Grid item xs={4} margin={1}>
                    <Paper elevation={3} sx={{padding:3}} >
                        <Typography variant='body1'>
                            Bitcoin is an open-source, uncensorable, decentralized, peer-to-peer payment system, 
                            invented anonymously by one Satoshi Nakomoto. 
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