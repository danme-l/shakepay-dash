import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const SPTable = ({ tableRows, values }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableRows.map((rows, index) => {
                            return <TableCell key={index}>{rows}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {values.map((value, index) => {
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
            </Table>
        </TableContainer>
    )
}