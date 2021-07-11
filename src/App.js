import './App.scss';
import {useCallback, useEffect, useRef, useState} from "react";

function Message(props) {
  return <div className={props.fromCurrentUser ? 'message message__right' : 'message message__left' }>
            <p className="message_author">{props.fromCurrentUser ? 'Вы' :props.author}</p>
            <p className="message_item">{props.text}</p>

    </div>

}

function App() {
    const [messageList, setMessageList] = useState([]);
    const [id, setId] = useState(1) // Хардкодинг, имитирующий увеличение ID у сообщений
    const [currentUser] = useState('Ivanov Ivan')
    const [currentMessage, setCurrentMessage] = useState('')
    const messageContainerRef = useRef(null);

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

    const handleInputChange = (event) => {
        setCurrentMessage(event.target.value)
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        addMessage(currentMessage, currentUser)
        setCurrentMessage('')
    }

    const robotAnswer = () => {
        if (messageList.length > 0 && messageList[messageList.length - 1].author !== 'Robot') {
            const robotMessage = 'Напечатай еще что-нибудь...'
            setTimeout(() => addMessage(robotMessage, 'Robot'), 1500)
        }
    }

    useEffect(robotAnswer, [messageList, addMessage])

    // Делаем скроллинг области, в которую выводим сообщения
    useEffect(() => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }, [messageList])

  return (
    <div className="App">
          <div className="message_container" ref={messageContainerRef}>
              {
                  messageList.map((message) =>
                      <Message key={message.id}
                               text={message.text}
                               author={message.author}
                               fromCurrentUser={message.author === currentUser} />)
              }
          </div>
          <form onSubmit={handleSubmitForm} className="form_container">
              <textarea value={currentMessage}  onChange={handleInputChange} className="form_input" />
              <input type="submit" value="Отправить" className="form_button"/>
          </form>
    </div>
  );
}

export default App;
