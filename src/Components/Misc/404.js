import { Paper, Typography } from '@mui/material';

export const Err404 = () => {
    return (    
        <Paper elevation={3} sx={{margin: 5, padding: 3}}>
            <Typography variant="h5">Error - We don't have that page</Typography>
            <Typography variant='body2'>You looking for Newton?</Typography>
        </Paper>
    )
}