import { Paper, Typography } from "@mui/material"

export const About = () => {
    return (
        <Paper elevation={3} sx={{margin: 5, padding: 3}}>
            <Typography variant="h5">I am not affiliated at all with Shakepay, just an enjoyer of their product (who might be right about to apply for a job there)</Typography>
            <Typography variant="body1"> - Bitcoin and Ether logos taken from react icons</Typography>
            <Typography variant="body1"> - Price data retrieved from coincodex.com</Typography>
        </Paper>
    )
    
}