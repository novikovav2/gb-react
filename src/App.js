import Chat from './components/chat'
import ChatsList from "./components/chats-list";
import {Box, createTheme, makeStyles, MuiThemeProvider} from "@material-ui/core";
import {useParams} from "react-router";
import {useState} from "react";

const useStyles = makeStyles({
    App: {
        textAlign: 'center',
        display: "flex",
        flexDirection: 'row'
    }
})

function App() {
    const {chatId} = useParams();
    const classes = useStyles();
    const darkTheme = createTheme({
        palette: {
            type: 'light' //dark
        }
    })

    // const currentChat= () => {
    //     return chatList.find((chat) => {
    //         if (chat.id === chatId) return true
    //     })
    // }

    const defaultChatsListValue = [
        {name: 'Robot', id: '111'},
        {name: 'Vasya', id: '222'},
        {name: 'Lesha', id: '333'},
        {name: 'Petya', id: '444'}
    ]

    const [chatList] = useState(defaultChatsListValue)

    const currentChat = chatList.find((chat) => {
        return chat.id === chatId ? true : false
    })

    return (
        <MuiThemeProvider theme={darkTheme}>
            <Box className={classes.App}>
                <ChatsList chatId={chatId} chatList={chatList}/>
                { currentChat && <Chat currentChat={currentChat}/> }
            </Box>
        </MuiThemeProvider>
    )
}

export default App;
