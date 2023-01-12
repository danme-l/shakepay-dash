import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link'
import moment from 'moment';
import { FaBitcoin, FaEthereum} from 'react-icons/fa';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

export const ModalContent = (modalContent) => {
    
    const getAddressLink = (addr, cur) => {
        return `https://www.blockchain.com/explorer/addresses/${cur}/${addr}`;
    }

    const getTransactionLink = (trans, cur) => {
        return `https://www.blockchain.com/explorer/transactions/${cur}/${trans}`;
    }

    const renderIcon = (cur) => {
        return cur === 'BTC' ? <FaBitcoin /> : cur === 'ETH' ? <FaEthereum /> : null;
    }
    
    let con = modalContent.modalContent;
    switch(con.transType) {
        case 'fiat funding':
            return (
                <Box sx={style}>
                    <Typography variant="h4" component="h2">
                        Fiat Funding | {moment(con.date).format('MMMM Do, YYYY')}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Your account was credited with {con.creditAm} {con.creditCur} from {con.sourceDest}
                    </Typography>
                </Box>
            )
        case 'crypto cashout':
            return (
                <Box sx={style}>
                    <Typography variant="h4" component="h2">
                    Crypto Cashout | { renderIcon(con.debitCur) } | {moment(con.date).format('MMMM Do, YYYY')} 
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        You moved {con.debitAm} {con.debitCur} to a private wallet. <br/>
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 2 }}>
                        <Link href={getAddressLink(con.sourceDest, con.debitCur)} target="_blank" rel="noreferrer" underline='hover'>
                            <Typography variant='body1'>View Wallet on Blockchain</Typography>
                        </Link> 
                        <Link href={getTransactionLink(con.blockchainID, con.debitCur)} target="_blank" rel="noreferrer" underline='hover'>
                            <Typography variant='body1'>View Transaction on Blockchain</Typography>
                        </Link>
                    </Typography>
                </Box>
            )
        case 'purchase/sale':
            if (con.dir === 'purchase') {
                return (
                    <Box sx={style}>
                        <Typography variant="h4" component="h2">
                            Purchase | { renderIcon(con.creditCur) } | {moment(con.date).format('MMMM Do, YYYY')}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            You bought {con.creditAm} {con.creditCur} at a Spot Price of {con.buyRate}
                        </Typography>
                    </Box>
                )
            } else if (con.dir === 'sale') {
                return (
                    <Box sx={style}>
                        <Typography variant="h4" component="h2">
                            Sale | { renderIcon(con.debitCur) } | {moment(con.date).format('MMMM Do, YYYY')}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            You sold {con.debitAm} {con.debitCur} at a Spot Price of {con.buyRate}
                        </Typography>
                    </Box>
                )
            }
            break;
        case 'peer transfer':
            return (
                <Box sx={style}>
                    <Typography variant="h4" component="h2">
                        Peer Transfer | { renderIcon(con.debitCur) } | {moment(con.date).format('MMMM Do, YYYY')}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        You sent {con.debitAm} {con.debitCur} to {con.sourceDest}
                    </Typography>
                </Box>
            )
        case 'card transactions':
            return (
                <Box sx={style}>
                    <Typography variant="h4" component="h2">
                        Card Transaction | {moment(con.date).format('MMMM Do, YYYY')}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        You spent {con.debitAm} {con.debitCur} at {con.sourceDest}
                    </Typography>
                </Box>
            )
        case 'card cashbacks':
            return (
                <Box sx={style}>
                    <Typography variant="h4" component="h2">
                        Card Cashbacks | { renderIcon(con.creditCur) } | {moment(con.date).format('MMMM Do, YYYY')}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        You got {(100000000*con.creditAm).toFixed(0)} Satoshis back 
                    </Typography>
                </Box>
            )
        case 'shakepay earn':
            return (
                <Box sx={style}>
                    <Typography variant="h4" component="h2">
                        Shakepay Earn | { renderIcon(con.creditCur) } | {moment(con.date).format('MMMM Do, YYYY')}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        You earned {(100000000*con.creditAm).toFixed(0)} Satoshis from hodling CAD
                    </Typography>
                </Box>
            )
        default:
            return (
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {con.transType}
                    </Typography>
                </Box>
            )
    }
}
  
export const TransModal = ({modalOpen, handleModalClose, modalContent}) => {
    if (!modalContent)   {
        return;
    };
    
    return (
            <div>
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <ModalContent modalContent={modalContent} />
                    </Box>
                </Modal>
            </div>
    );
  }