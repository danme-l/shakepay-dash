import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FaBitcoin} from 'react-icons/fa';
import { FaEthereum } from 'react-icons/fa';

// styled custom paper object for the landing page
const StyPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    textAlign: 'center',
    height: '80%',
    width: '100%',
    position: 'relative', // to make the z-index work
    zIndex: 1,
    transitionOrigin: '50% 50%',
    transition: theme.transitions.create(
        ['background-color', 'height', 'width','color', 'transform'],
        {duration: theme.transitions.duration.short}
    ),
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        transform: 'scale(1.1)',
        zIndex: 10,
    },
}));

export const Landing = ({ userData, purchaseData, purchaseTotal, btcBuys, ethBuys, cardPurchases, cardCashbacks, spEarn }) => {
    // Landing page renders only if data is inputted
    if (userData) { 
        return (
            <Box sx={{ flexGrow: 1, margin: 4}}>
                <Grid container spacing={5} direction="row"
                        alignItems="stretch">
                    {/* GRID UPPER ROW */}
                    <Grid item xs={6}>
                        <StyPaper><Typography variant='h5'>You have converted ${purchaseTotal} from Fiat to Bitcoin and Ethereum on Shakepay</Typography></StyPaper>
                    </Grid>
                    {/* TODO onMouseEnter={(event) => setAnchorEl(event.currentTarget)} onMouseLeave={() => setAnchorEl(null)} */}
                    <Grid item xs={3} > 
                        {/* BTC Box */}
                        <StyPaper >
                            <Grid container direction="row" alignItems='center' justifyContent='space-evenly'>
                                <Grid item xs={2}>
                                    <FaBitcoin size={'2em'}/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant='h6'>Total BTC Purchased</Typography>
                                    {btcBuys.reduce((t, d) => parseFloat(d["Amount Credited"]) + t, 0)}
                                </Grid>
                            </Grid>
                        </StyPaper>
                    </Grid>
                    <Grid item xs={3}>
                        {/* ETH Box */}
                        <StyPaper>
                            <Grid container direction="row" alignItems='center' justifyContent='space-evenly'>
                                <Grid item xs={2}>
                                    <FaEthereum size={'2em'}/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant='h6'>Total ETH Purchased</Typography>
                                    {ethBuys.reduce((t, d) => parseFloat(d["Amount Credited"]) + t, 0)}
                                </Grid>
                            </Grid>                            
                        </StyPaper>
                    </Grid>
                    {/* Second Row */}
                    <Grid item xs={4}>
                        {/* Visa Box - shows quick card metrics */}
                        <StyPaper>
                            <Typography variant='h6'>Shakepay Visa</Typography>
                            <Typography variant='body1'>
                                Amount spent: ${cardPurchases.reduce((t, d) => parseFloat(d['Amount Debited']) + t, 0).toFixed(2)} 
                                <br /># Transactions: {cardPurchases.length} 
                            </Typography>
                        </StyPaper>
                    </Grid>
                    <Grid item xs={4}>
                        {/* Cashback Box */}
                        <StyPaper>
                            <Typography variant='h6'>Cashback Earned</Typography>
                            <Typography variant='body1'>
                                {cardCashbacks.reduce((t, d) => parseFloat(d['Amount Credited'])*100000000 + t, 0)} Satoshis
                            </Typography>
                        </StyPaper>
                    </Grid>
                    <Grid item xs={4}>
                        {/* Shakepay Earn Box */}
                        <StyPaper>
                            <Typography variant='h6'>Shakepay Earn</Typography>
                            <Typography variant='body1'>
                                {spEarn.reduce((t, d) => parseFloat(d['Amount Credited'])*100000000 + t, 0)} Satoshis
                            </Typography>
                        </StyPaper>
                    </Grid>
                </Grid>
          </Box>
        )
    }
    
}