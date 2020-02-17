import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { withFirebase } from '../../../Firebase/index';

const BaseListItemComponent = (props) => {
    const [open, setOpen] = useState(false);
    const { key, name, link } = props.item;
    const handleClick = () => {
        setOpen(!open);
    }
    const deleteItem = (key) => {
        console.log('deleting');
        props.firebase.deleteItem(key, props.owner);
    }
    return (
        <List component="div" disablePadding>
            <ListItem divider={true}>
                {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
                <ListItemText primary={name} onClick={handleClick} />
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
                <ListItemIcon onClick={() => deleteItem(key)}>
                    <DeleteIcon />
                </ListItemIcon>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button>
                        <a rel="noopener noreferrer" href={link} target="_blank">Link</a>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    )
}

const ListItemComponent = withFirebase(BaseListItemComponent);

export default ListItemComponent;