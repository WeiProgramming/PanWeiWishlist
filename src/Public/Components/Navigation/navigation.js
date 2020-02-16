import React, {useState} from 'react';
import logo from '../../../assets/images/logo.PNG';
import {Typography, Link, Menu, MenuItem, Button, Paper, Popper, Grow,MenuList, ClickAwayListener} from "@material-ui/core";
import './navigation.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));
const Navigation = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <div>
            {/*<nav>*/}
                {/*<img src={logo} alt="website logo"/>*/}
                {/*<h1>This is the navigation</h1>*/}
                {/*<Typography>*/}
                    {/*<Button onMouseOver={handleClick} id="style-apparels">*/}
                        {/*UwU Style Apparels*/}
                    {/*</Button>*/}
                    {/*<Menu*/}
                        {/*anchorEl={anchorEl}*/}
                        {/*keepMounted*/}
                        {/*open={Boolean(anchorEl === "style-apparels")}*/}
                        {/*onClose={handleClose}*/}
                    {/*>*/}
                        {/*<MenuItem onClick={handleClose}>UwU Tees</MenuItem>*/}
                        {/*<MenuItem onClick={handleClose}>UwU Long Sleeves</MenuItem>*/}
                        {/*<MenuItem onClick={handleClose}>UwU Hoodies</MenuItem>*/}
                        {/*<MenuItem onClick={handleClose}>UwU Swea</MenuItem>*/}
                    {/*</Menu>*/}
                    {/*<Button onMouseOver={handleClick} id="accessories">*/}
                        {/*Accessories*/}
                    {/*</Button>*/}
                    {/*<Menu*/}
                        {/*id="accessories"*/}
                        {/*anchorEl={anchorEl}*/}
                        {/*keepMounted*/}
                        {/*open={Boolean(anchorEl === 'accessories')}*/}
                        {/*onClose={handleClose}*/}
                    {/*>*/}
                        {/*<MenuItem onClick={handleClose}>Bags</MenuItem>*/}
                        {/*<MenuItem onClick={handleClose}>Foot Wear</MenuItem>*/}
                        {/*<MenuItem onClick={handleClose}>Jewelry</MenuItem>*/}
                    {/*</Menu>*/}
                    {/*<Link>*/}
                        {/*Stationary*/}
                    {/*</Link>*/}
                    {/*<Link>*/}
                        {/*Phone Accessories*/}
                    {/*</Link>*/}
                    {/*<Link>*/}
                        {/*Plushies*/}
                    {/*</Link>*/}
                    {/*<Link>*/}
                        {/*Home Decor*/}
                    {/*</Link>*/}
                    {/*<Link>*/}
                        {/*Miscellaneous*/}
                    {/*</Link>*/}
                {/*</Typography>*/}
            {/*</nav>*/}
            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    Toggle Menu Grow
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    )
}

export default Navigation;
