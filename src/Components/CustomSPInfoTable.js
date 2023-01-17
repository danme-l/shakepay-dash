import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { TableHead } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TablePaginationActions } from './Utils/TablePaginationActions';


// much of this taken directly from mui docs examples 
// https://mui.com/material-ui/react-table/#custom-pagination-actions
export const CustomSPInfoTable = ({ data, fieldHeaders, fieldIndices, btcOrEth=null, highlight=null, showBlockchain=false, calculateCadVal=false }) => {
    const theme = useTheme();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    console.log(calculateCadVal);

    // create data
    const rows = [];
    data.map((d,i) => {
        // map over each transaction 
        const v = Object.values(d);
        const row = {'i': i};
        fieldIndices.forEach((val, ind) => {
            // set the relevant information from the transaction in the row
            // 'val' in this case is the current integer from the field indices
            row[fieldHeaders[ind]] = v[val]
        });
        if (calculateCadVal) {
            row['Reward - CAD'] = v[4] * v[8]
        }
        rows.push(row)
    });

    console.log(rows);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getAddressCell = (row) => {
        return (
            <TableCell align='center'>
                {row['Source / Destination']}
                <Link href={getAddressLink(row['Source / Destination'])} target="_blank" rel="noreferrer">
                    <Typography variant='body1'>View on Blockchain</Typography>
                </Link>
            </TableCell>
        )
    }

    const getAddressLink = (addr) => {
        return `https://www.blockchain.com/explorer/addresses/${btcOrEth}/${addr}`;
    }

    const getTransactionCell = (row) => {
        return (
            <TableCell align='center'>
                {row['Blockchain Transaction ID']}
                <Link href={getTransactionLink(row['Blockchain Transaction ID'])} target="_blank" rel="noreferrer">
                    <Typography variant='body1'>View on Blockchain</Typography>
                </Link>
            </TableCell>
        )
    }

    const getTransactionLink = (trans) => {
        return `https://www.blockchain.com/explorer/transactions/${btcOrEth}/${trans}`;
    }

    const formatCell = (row, column) => {
        if (column === 'Date') {
            return <TableCell>{row[column].slice(0,10)}</TableCell>;
        } else if (column === 'Spot Rate' || column === 'Buy / Sell Rate' || column === 'Reward - CAD') {
            return <TableCell>{"$" + parseFloat(row[column]).toFixed(2)}</TableCell>
        } else if (column === 'Source / Destination' && showBlockchain) {
            return getAddressCell(row)
        } else if (column === 'Blockchain Transaction ID' && showBlockchain) {
            return getTransactionCell(row)
        } else 
        return <TableCell>{row[column]}</TableCell>
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
            <TableRow>
                {fieldHeaders.map((h, i) => {
                    return <TableCell>{h}</TableCell>
                })}
            </TableRow>
        </TableHead>
        <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            ).map((row, i) => (
                <TableRow key={row.date} sx={{ bgcolor: () => (row.i === highlight) ? theme.palette.secondary.main : null }}>
                    {fieldHeaders.map((h, i) => {
                        return formatCell(row, h)
                    })}
                </TableRow>
            ))}

            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
        <TableFooter>
            <TableRow>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                inputProps: {
                    'aria-label': 'rows per page',
                },
                native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
            </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}