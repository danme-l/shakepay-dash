import React, {useState} from 'react';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { TransModal } from './TransModal';

function createData(id, transType, date, debitAm, debitCur, creditAm, creditCur, buyRate, dir, spotRate, sourceDest, blockchainID) {
    date = date.slice(0,10); // fix the date
    if (spotRate) {
        spotRate = "$" + parseFloat(spotRate).toFixed(2);
    };
    if (buyRate) {
        buyRate = "$" + parseFloat(buyRate).toFixed(2);
    };  
    return {id, transType, date, debitAm, debitCur, creditAm, creditCur, buyRate, dir, spotRate, sourceDest, blockchainID };
  }

const columns = [
    {
        field: "id",
        headerName: "#",
        width: 5,
    },
    {
        field: 'transType',
        headerName: "Transaction Type",
        width: 150,
    },
    {
        field: "date",
        headerName: "Date",
        type: 'date',
        width: 100,
    },
    {
        field: "debitAm",
        headerName: "Amount Debited",
        type: 'number',
        width: 150,
    },
    {
        field: "debitCur",
        headerName: "Debit Currency",
        width: 150,
    },
    {
        field: "creditAm",
        headerName: "Amount Credited",
        type: 'number',
        width: 150,
    },
    {
        field: "creditCur",
        headerName: "Credit Currency",
        width: 150,
    },
    {
        field: "buyRate",
        headerName: "Buy / Sell Rate",
        type: 'number',
        width: 150,
    },
    {
        field: "dir",
        headerName: "Direction",
        width: 100,
    },
    {
        field: "spotRate",
        headerName: "Spot Rate",
        type: 'number',
        width: 100,
    },
    {
        field: "sourceDest",
        headerName: "Source / Destination",
        minWidth: 250,
        flex:2,
    },
    {
        field: "blockchainID",
        headerName: "Blockchain Transaction ID",
        minWidth: 250,
        flex:2,
    }
]

export const SPTable = ({ data }) => {
    const [page, setPage] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleModalOpen = (trans) => {
        setModalContent(trans);
        setModalOpen(true)
    };
    const handleModalClose = () => setModalOpen(false);

    // create data
    const rows = [];
    data.map((d,id) => {
        const v = Object.values(d);
        rows.push(createData(id, ...v))
    });

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event, 10));
        setPage(0);
    };

    return (
        <Box sx={{ height: 150+60*rowsPerPage, width: '100%' }}>
            <TransModal 
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
                handleModalOpen={handleModalOpen}
                modalContent={modalContent}
                setModalContent={setModalContent}
            />
            <DataGrid
                rows={rows} rowHeight={60}
                columns={columns}
                headerHeight={90} 
                pageSize={rowsPerPage}
                onPageSizeChange={(e) => handleChangeRowsPerPage(e)}
                rowsPerPageOptions={[5,10,15]}
                onRowClick={(e) => handleModalOpen(e.row)}
            />
        </Box>
    )
}