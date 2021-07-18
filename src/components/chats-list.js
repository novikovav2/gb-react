import {useState} from "react";
import {ListItem, List, ListItemText, ListItemAvatar, Avatar, Paper, makeStyles, Typography} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles({
    root: {
        minWidth: "30%",
        height: "100vh"
    }
})

export default function ChatsList() {
    const classes = useStyles();
    const defaultChatsListValue = [
        {name: 'Robot', id: 'robot'},
        {name: 'Vasya', id: 'vasya'},
        {name: 'Lesha', id: 'lesha'},
        {name: 'Petya', id: 'patya'}
    ]

    const [chatList] = useState(defaultChatsListValue)

    return (
        <Paper elevation={10} className={classes.root}>
            <Typography variant="h5">
                Ваши контакты
            </Typography>
            {
                chatList.map((chat) =>
                    <List key={chat.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={chat.name}
                                          secondary={chat.id}/>
                        </ListItem>
                    </List>
                )
            }
        </Paper>
    )
}
