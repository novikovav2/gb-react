import Chat from './components/chat'
import ChatsList from "./components/chats-list";
import {Box, createTheme, makeStyles, MuiThemeProvider} from "@material-ui/core";
import {useParams} from "react-router";
import {useSelector} from "react-redux";

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

    const chatList = useSelector(state => state.chats)

    const currentChat = chatList.find((chat) => {
        return chat.id === +chatId
    })

    return (
        <MuiThemeProvider theme={darkTheme}>
            <Box className={classes.App}>
                <ChatsList chatId={chatId}/>
                {currentChat && <Chat currentChat={currentChat}/>}
            </Box>
        </MuiThemeProvider>
    )
}

export default App;
