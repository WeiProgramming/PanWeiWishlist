import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../../Firebase/index';
import _ from 'lodash';
import {
    makeStyles,
    Button,
    Grid,
    Paper,
    List,
    ListItemIcon,
    ListItem,
    ListItemText,
    FormControl,
    Input,
    InputLabel,
    Container,
    Modal,
    Backdrop,
    Fade
} from '@material-ui/core';
import presheen from '../../../assets/images/presheen.png';
import ListItemComponent from '../ListItem/ListItem';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
const useStyles = makeStyles(theme => ({
    listitemicon: {
        display: 'flex',
        justifyContent: 'center'
    },
    listitem: {
        display: 'flex',
        justifyContent: 'center'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    paneeTheme: {
        background: 'rgb(255,154,158)',
        background: 'radial-gradient(circle, rgba(255,154,158,1) 0%, rgba(254,207,239,1) 100%)'
    },
    weiTheme: {
        background: 'rgb(161,196,253)',
        background: 'radial-gradient(circle, rgba(161,196,253,1) 0%, rgba(194,233,251,1) 100%)'
    }
}))

const BaseListComponent = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState({ name: '', link: '' })
    const [items, setItems] = useState({});
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        props.firebase.getAllItems().on('value', snapshot => {
            setItems(snapshot.val());
        })
    }, []);
    const handleInputChange = (e) => {
        console.log('input-change', e);
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (event, name) => {
        event.preventDefault();
        props.firebase.addWishItem(name, values);
        setValues({ name: '', link: '' })
        setOpen(false);
    }
    const handleOpen = (user) => {
        setCurrentUser(user);
        setOpen(true);
        console.log('currentUser', currentUser);
        console.log('user', user);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const ObjToArrayObj = (obj) => {
        // returns an array object of keys with values in them
        var data = [];
        console.log('obj',obj);
        var keys = Object.keys(obj);
        var values = Object.values(obj);
        // console.log('keys', keys);
        // console.log('values', values);
        for (let i = 0; i < keys.length; i++) {
            data[i] = { key: keys[i], ...values[i] }
        }
        // console.log('data', data);
        return data;
    }
    return (
        <div>
            <Container maxWidth="xl">
                <div className="row">
                    <div className="col-md-12 row justify-content-center">
                        <img src={presheen} style={{width: '100px'}}/>
                    </div>
                    <div className="col-md-12 mb-3">
                        <h1 className="text-center"> WISH LIST </h1>
                    </div>
                </div>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Paper elevation={3} className={classes.weiTheme}>
                                    <div className="container p-3">
                                        <h1 className="text-center text-uppercase" style={{color: '#ffffff', fontWeight: 'bold'}}>Wei</h1>
                                    </div>
                                    <List component="div" disablePadding>
                                        {(items == null || items.Wei == null) ? (<div className="container"> There are no items</div>) :
                                            ObjToArrayObj(items.Wei.list).map((item) => (
                                                (
                                                    <ListItemComponent item={item} owner={'Wei'} />
                                                )))}
                                        <ListItem className={classes.listitem}>
                                            <ListItemIcon className={classes.listitemicon} onClick={() => handleOpen('Wei')}>
                                                <AddCircleOutlineOutlinedIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper elevation={3} className={classes.paneeTheme}>
                                    <div className="container p-3">
                                        <h1 className="text-center text-uppercase" style={{color: '#ffffff', fontWeight: 'bold'}}>Panee</h1>
                                    </div>
                                    <List component="div" disablePadding>
                                        {(items == null || items.Panee == null) ? (<div className="container"> There are no items</div>) :
                                            ObjToArrayObj(items.Panee.list).map((item) => (
                                                (
                                                    <ListItemComponent item={item} owner={'Panee'} />
                                                )))}
                                        <ListItem className={classes.listitem}>
                                            <ListItemIcon className={classes.listitemicon} onClick={() => handleOpen('Panee')}>
                                                <AddCircleOutlineOutlinedIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
            </Container>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div class="row">
                            <div class="container">
                            <List component="div">
                                    <ListItem>
                                        <ListItemText>
                                            <h3>Add New Item! :D</h3>
                                        </ListItemText>
                                        <ListItemIcon onClick={() => handleClose()}>
                                            <CloseIcon />
                                        </ListItemIcon>
                                    </ListItem>
                                </List>
                                <form>
                                    <FormControl fullWidth={true}>
                                        <InputLabel htmlFor="name">Item Name</InputLabel>
                                        <Input id="name" name="name" value={values.name} onChange={handleInputChange} />
                                    </FormControl>
                                    <FormControl fullWidth={true}>
                                        <InputLabel htmlFor="link">Link </InputLabel>
                                        <Input id="link" name="link" value={values.link} onChange={handleInputChange} />
                                    </FormControl>
                                    <br/>
                                    <Button variant="outlined" color="primary" onClick={event => handleSubmit(event, currentUser)}>Submit</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
};

const ListComponent = withFirebase(BaseListComponent);
export default ListComponent;