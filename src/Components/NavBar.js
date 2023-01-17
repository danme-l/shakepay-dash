import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx= {{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton 
                        id='basic-button'
                        size='large'
                        edge='start' 
                        colors='inherit' 
                        aria-label='menu'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{ mr: 2}}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}>
                        <Link to='/'><MenuItem onClick={handleClose}>Home</MenuItem></Link>
                        <Link to='/table'><MenuItem onClick={handleClose}>Table</MenuItem></Link>
                        <Link to='/btc'><MenuItem onClick={handleClose}>Bitcoin</MenuItem></Link>
                        <Link to='/eth'><MenuItem onClick={handleClose}>Ether</MenuItem></Link>
                        <Link to='/rewards'><MenuItem onClick={handleClose}>Card & Earn</MenuItem></Link>
                        <Link to='/about'><MenuItem onClick={handleClose}>About</MenuItem></Link>
                    </Menu>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        Shakepay Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}