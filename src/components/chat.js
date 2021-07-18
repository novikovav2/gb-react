import Message from "./message";
import {useCallback, useEffect, useRef, useState} from "react";
import {Box, FormControl, Grid, IconButton, makeStyles, Paper, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles({
    root: {
        minWidth: "70%",
        padding: "0 20px",
        boxSizing: "border-box"
    },
    chatContainer: {
        height: "80vh",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#FFF0EC',
        marginBottom: 20
    },
    input: {
        minWidth: "80%"
    }
})

export default function Chat() {
    const classes = useStyles();
    const [messageList, setMessageList] = useState([]);
    const [id, setId] = useState(1) // Хардкодинг, имитирующий увеличение ID у сообщений
    const [currentUser] = useState('Ivanov Ivan')
    const messageContainerRef = useRef(null);
    const inputRef = useRef(null);
    const [currentMessage, setCurrentMessage] = useState('')

    const addMessage = useCallback((text, author) => {
        const msg = {
            id: id,
            author: author,
            text: text
        }

        setMessageList((prevMessageList) => {
            return prevMessageList.concat(msg);
        });

        setId((oldId) => oldId + 1); // Хардкодинг, для увеличения id сообщений
    }, [id]);


    const robotAnswer = () => {
        if (messageList.length > 0 && messageList[messageList.length - 1].author !== 'Robot') {
            const robotMessage = 'Напечатай еще что-нибудь...'
            setTimeout(() => addMessage(robotMessage, 'Robot'), 1500)
        }
    }

    const handleInputChange = (event) => {
        setCurrentMessage(event.target.value)
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        addMessage(currentMessage, currentUser)
        setCurrentMessage('')
    }

    useEffect(robotAnswer, [messageList, addMessage])

    // Делаем скроллинг области, в которую выводим сообщения и возвращаем фокус на поле ввода
    useEffect(() => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        inputRef.current.focus()
    }, [messageList])

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" >
                Название чата
            </Typography>
            <Box className={classes.chatContainer} ref={messageContainerRef}>
                <Grid container direction="column" >
                    {
                        messageList.map((message) =>
                            <Message key={message.id}
                                     text={message.text}
                                     author={message.author}
                                     fromCurrentUser={message.author === currentUser} />)
                    }
                </Grid>
            </Box>

            <form onSubmit={handleSubmitForm} >
                <FormControl className={classes.input}>
                    <TextField label="Ваше сообщение"
                               id='text-field'
                               multiline
                               rows={3}
                               variant="outlined"
                               value={currentMessage}
                               onChange={handleInputChange}
                               autoFocus
                               required
                               inputRef={inputRef}
                    />
                </FormControl>
                <IconButton area-label='send' type={"submit"}>
                    <SendIcon color="primary"/>
                </IconButton>
            </form>
        </Paper>
    );
}
