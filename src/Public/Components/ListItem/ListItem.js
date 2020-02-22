import React, { useState } from 'react';
import { List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    FormControl,
    Input,
    InputLabel,
    Modal,
    Fade,
    Button,
Backdrop} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { withFirebase } from '../../../Firebase/index';
import {makeStyles} from "@material-ui/core/index";

const useStyles = makeStyles(theme => ({
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
    }
}));

const BaseListItemComponent = (props) => {
    const classes = useStyles();
    // Item variable is an object and contains items {key, name, link}
    const { item, owner } = props;
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [values, setValues] = useState({name: item.name, link: item.link});
    const handleClick = () => {
        setOpen(!open);
    }
    const deleteItem = (key) => {
        console.log('deleting');
        props.firebase.deleteItem(key, owner);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.firebase.editWishItem(owner, values, item.key);
        setModalOpen(false);
    }
    const handleOpen = () => {
        setModalOpen(true);
    };
    const handleClose = () => {
        setModalOpen(false);
    };
    return (
        <List component="div" disablePadding>
            <ListItem divider={true}>
                {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
                <ListItemText primary={values.name} onClick={handleClick} />
                <ListItemIcon onClick={() => handleOpen()}>
                    <CreateIcon />
                </ListItemIcon>
                <ListItemIcon onClick={() => deleteItem(item.key)}>
                    <DeleteIcon />
                </ListItemIcon>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button>
                        <a rel="noopener noreferrer" href={values.link} target="_blank">Find It here: {values.link}</a>
                    </ListItem>
                </List>
            </Collapse>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <div className={classes.paper}>
                        <div class="row">
                            <div class="container">
                                <List component="div">
                                    <ListItem>
                                        <ListItemText>
                                            <h3>Edit Me! :D</h3>
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
                                    <Button variant="outlined" color="primary" onClick={event => handleSubmit(event)}>Submit</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </List>
    )
}

const ListItemComponent = withFirebase(BaseListItemComponent);

export default ListItemComponent;