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
import { TableHead } from '@mui/material';
import { TablePaginationActions } from '../Utils/TablePaginationActions';


// this table and <TablePaginationActions /> are more or less lifted directly from the mui examples
function createData(i, date,  debitAm, dest) {
  return {i, date,  debitAm, dest };
}

export const CardPurchaseTable = ({ data, highlight }) => {
    const theme = useTheme();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // create data
    const rows = [];
    data.map((d,i) => {
        const v = Object.values(d);
        // console.log(v);
        rows.push(createData(i, v[1],v[2],v[9]))
    });
    
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount Debited</TableCell>
                <TableCell>Point of Sale</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            ).map((row, i) => (
                <TableRow key={row.date} sx={{ bgcolor: () => (row.i == highlight) ? theme.palette.secondary.main : null }}>
                    <TableCell component="th" scope="row">
                    {row.date.slice(0,10)}
                    </TableCell>
                    <TableCell>
                    ${parseFloat(row.debitAm).toFixed(2)}
                    </TableCell>
                    <TableCell>
                    {row.dest}
                    </TableCell>
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