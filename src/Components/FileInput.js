import React from "react";
import Papa from 'papaparse';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export const FileInput = (props) => {

    const handleFileInput = (e) => {
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];

                // Iterate data to get column name and their values
                // eslint-disable-next-line
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });

                // Parsed Data Response in Array
                props.setParsedData(results.data);

                // Filted Column names
                props.setTableRows(rowsArray[0]);

                // Filtered Values
                props.setValues(valuesArray);
            }
        })
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: 10,
            }}>
            <Paper elevation={5} 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5
                }}>
                <Typography variant="h5"> Input your Shakepay-Issued CSV file here:</Typography>
                <br />
                <form>
                    <input 
                    type="file"
                    accept=".csv"
                    onChange={handleFileInput}
                    />
                </form>
                {/* TODO */}
                {/* <Button>
                    Where do I find this?
                </Button> */}
            </Paper>
        </Box>
    )
}