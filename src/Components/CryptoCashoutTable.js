import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead, Typography } from '@mui/material';
import { Link } from '@mui/material';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(i, date, debitCur, debitAm, spot, destination, blockchainId) {
  return {i, date, debitCur, debitAm, spot, destination, blockchainId };
}

export const CryptoCashoutTable = ( { data, highlight, btcOrEth }) => {
    const theme = useTheme();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // create data
    const rows = [];
    data.map((d,i) => {
        const v = Object.values(d);
        rows.push(createData(i, v[1],v[2],v[3], v[8], v[9], v[10]))
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

    const getAddressLink = (addr) => {
        return `https://www.blockchain.com/explorer/addresses/${btcOrEth}/${addr}`;
    }

    const getTransactionLink = (trans) => {
        return `https://www.blockchain.com/explorer/transactions/${btcOrEth}/${trans}`;
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Debit Currency</TableCell>
                <TableCell>Amout Debited</TableCell>
                <TableCell>Spot Rate</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Blockchain Transaction ID</TableCell>
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
                    <TableCell align="right">
                        {row.debitAm}
                    </TableCell>
                    <TableCell align="right">
                        {row.debitCur}
                    </TableCell>
                    <TableCell align="right">
                        {row.spot}
                    </TableCell>
                    <TableCell align="center">
                        {row.destination}
                        <Link href={getAddressLink(row.destination)} target="_blank" rel="noreferrer">
                            <Typography variant='body1'>View on Blockchain</Typography>
                        </Link>
                    </TableCell>
                    <TableCell align="center">
                        {row.blockchainId}
                        <Link href={getTransactionLink(row.blockchainId)} target="_blank" rel="noreferrer">
                            <Typography variant='body1'>View on Blockchain</Typography>
                        </Link>
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