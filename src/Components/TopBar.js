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
                        <MenuItem onClick={handleClose}><Link to='/'>Home</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to='/table'>Table</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to='/about'>About</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to='/btc'>Bitcoin</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to='/eth'>Ether</Link></MenuItem>
                    </Menu>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        Shakepay Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}