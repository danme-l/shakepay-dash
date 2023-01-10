import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import {TablePagination} from '@mui/material';
import Paper from '@mui/material/Paper';
import { TablePaginationActions } from './Utils/TablePaginationActions';

export const SPTable = ({ tableRows, values }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // TODO come back and recreate the data like this 
    // create data
    // const rows = [];
    // data.map((d,i) => {
    //     const v = Object.values(d);
    //     rows.push(createData(i, v[1],v[2],v[3], v[8], v[9], v[10]))
    // });

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - values.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 650, margin: 4 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableRows.map((rows, index) => {
                            return <TableCell key={index}>{rows}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? values.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : values
                    ).map((value, index) => {
                            return (
                                <TableRow 
                                  key={index}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    {value.map((val, i) => {
                                        return <TableCell key={i}>{val}</TableCell>;
                                    })}
                                </TableRow>
                            );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={values.length}
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
    )
}