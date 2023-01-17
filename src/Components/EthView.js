import React, {useEffect, useState} from 'react';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import priceData from '../static/data/btc_eth_cadRate.json';
import { Box } from '@mui/system';
import { Link } from '@mui/material';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaEthereum } from 'react-icons/fa';
import { Grid } from '@mui/material'
import { CustomSPInfoTable } from './CustomSPInfoTable';
import { CryptoBuyChart } from './CryptoBuyChart';
import { CryptoCashoutTable } from './Deprecated/CryptoCashoutTable';

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
                <Grid item xs={6}>
                    <Typography variant='h1' >Ether <FaEthereum /> </Typography>
                </Grid>
                <Grid item xs={4} margin={1}>
                    <Paper elevation={3} sx={{padding:3}} >
                        <Typography variant='body1'>
                            Ethereum is a decentralized, open-source blockchain with smart contract functionality. 
                            Ether is the native cryptocurrency of the platform. 
                            Among cryptocurrencies, ether is second only to bitcoin in market capitalization. 
                            Ethereum was conceived in 2013 by programmer Vitalik Buterin.
                        </Typography>
                        <ul>
                            <li>
                                <Link href='ethereum.org' target="_blank" rel="noreferrer">
                                    <Typography variant='body1'>ethereum.org <BsFillArrowRightCircleFill /> </Typography>
                                </Link>
                            </li>
                            <li>
                                <Link href='https://ethereum.org/en/whitepaper/' target="_blank" rel="noreferrer">
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
                        buysData={ethBuys} 
                        mouseOverDot={mouseOverDot} 
                        setMouseOverDot={setMouseOverDot}
                        highlightBuy={highlightBuy} 
                        btcOrEth='eth' />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant='h4'>ETH Buys</Typography>
                    <CustomSPInfoTable 
                        data={ethBuys} 
                        highlight={highlight} 
                        // date, debitCur, debitAm, creditCur, creditAm, buy
                        fieldHeaders={['Date','Debit Amount', 'Debit Currency', 'Credit Amount', 'Credit Currency', 'Buy / Sell Rate']} 
                        fieldIndices={[ 1, 2, 3, 4, 5, 6]}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h4'>ETH Cashouts to Wallet</Typography>
                    <CustomSPInfoTable 
                        data={ethCashouts} 
                        fieldHeaders={['Date','Debit Amount', 'Debit Currency', 'Spot Rate', 'Source / Destination', 'Blockchain Transaction ID']} 
                        fieldIndices={[ 1, 2, 3, 8, 9, 10]}
                        btcOrEth={'eth'}
                        showBlockchain={true}
                    />
                </Grid>
            </Grid>          
        </Box>
    )
};