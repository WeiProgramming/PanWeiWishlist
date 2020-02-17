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
    FormControl,
    Input,
    InputLabel,
    Container,
    Modal,
    Backdrop,
    Fade
} from '@material-ui/core';
import ListItemComponent from '../ListItem/ListItem';
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
                <div class="Title">
                    <h1 class="text-center">Our Wish List {"<"}3 :D</h1>
                </div>
                {_.isEmpty(items) ? (<div>Nothing</div>) :
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Paper elevation={3}>
                                    <h1>Wei's List</h1>
                                    <List component="div" disablePadding>
                                        {ObjToArrayObj(items.Wei.list) !== 0 ?
                                            ObjToArrayObj(items.Wei.list).map((item) => (
                                                (
                                                    <ListItemComponent item={item} owner={'Wei'} />
                                                ))) : (<div> There are no items</div>)}
                                        <ListItem className={classes.listitem}>
                                            <ListItemIcon className={classes.listitemicon} onClick={() => handleOpen('Wei')}>
                                                <AddCircleOutlineOutlinedIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper elevation={3}>
                                    <h1>Panee's List</h1>
                                    <List component="div" disablePadding>
                                        {ObjToArrayObj(items.Panee.list) !== 0 ?
                                            ObjToArrayObj(items.Panee.list).map((item) => (
                                                (
                                                    <ListItemComponent item={item} owner={'Panee'} />
                                                ))) : (<div> There are no items</div>)}
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
                }
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
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div class="row">
                            <div class="container">
                                <h3>Add Your Item! :D</h3>
                                <form>
                                    <FormControl fullWidth={true}>
                                        <InputLabel htmlFor="name">Item Name</InputLabel>
                                        <Input id="name" name="name" value={values.name} onChange={handleInputChange} />
                                    </FormControl>
                                    <FormControl fullWidth={true}>
                                        <InputLabel htmlFor="link">Link </InputLabel>
                                        <Input id="link" name="link" value={values.link} onChange={handleInputChange} />
                                    </FormControl>
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