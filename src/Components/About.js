import { Paper, Typography, Link } from "@mui/material"

export const About = () => {
    return (
        <Paper elevation={3} sx={{mx: 22, mt:10, px: 14, py:4}}>
            <Typography variant="h4" align='center' gutterBottom={true}>I am not affiliated at all with Shakepay, just an enjoyer of their product and a Bitcoin enthusiast.</Typography>
            <Typography variant="body1">
                I have no rights to the Shakepay logo or any of their copyrighted material. Anything used on this page is used as a fan of the company only.<br />
                I had originally just wanted to build something to parse my own Shakepay data, and then expanded it as a hobby project.
            </Typography>
            <Typography variant="h4" align='center'gutterBottom={true}> Info</Typography>
            <Typography variant="body1"> 
                This is currently a front-end only built using ReactJS. Your CSV file, when you upload it, is parsed in the browser, 
                and isn't saved anywhere (in it's current form, this web app doesn't even have the capability to save it anywhere).
            </Typography>
            <Typography variant="body1">
                <ul>
                    <li>The entire UI was built using <Link href='https://mui.com/material-ui/getting-started/overview/'>MUI (Material UI)</Link> - a library of React UI components that implements Google's Material Design.</li>
                    <li>Graphs and charts were created using <Link href='https://recharts.org/en-US'>Recharts</Link></li>
                    <li>Bitcoin and Ether logos taken from <Link href='https://react-icons.github.io/react-icons/'> React Icons</Link></li>
                    <li>Price data retrieved from <Link href='https://coincodex.com'>Coin Codex</Link>, and arranged in JSON format using a Python Script with Pandas. Data is up to date as of Jan 5, 2023.</li>
                </ul>
            </Typography>
        </Paper>
    )   
}