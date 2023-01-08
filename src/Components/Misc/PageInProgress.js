import { Paper, Typography } from '@mui/material';

export const PageInProgress = () => {
    return (
        <Paper elevation={3} sx={{margin: 5, padding: 3}}>
            <Typography variant="h5">This page is a work in progress.</Typography>
            <Typography variant='body2'>I'll get to it eventually.</Typography>
        </Paper>
    )
}