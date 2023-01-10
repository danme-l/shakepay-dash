import * as React from 'react';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

function createData(id, transType, date, debitAm, debitCur, creditAm, creditCur, buyRate, dir, spotRate, sourceDest, blockchainID) {
    date = date.slice(0,10); // fix the date
    if (spotRate) {
        spotRate = "$" + parseFloat(spotRate).toFixed(2);
    }    
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
        width: 100,
    },
    {
        field: "debitAm",
        headerName: "Amount Debited",
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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            <DataGrid
                rows={rows} rowHeight={60}
                columns={columns}
                headerHeight={90} 
                pageSize={rowsPerPage}
                onPageSizeChange={(e) => handleChangeRowsPerPage(e)}
                rowsPerPageOptions={[5,10,15]}
            />
        </Box>
    )
}