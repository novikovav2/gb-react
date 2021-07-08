import logo from './logo.svg';
import './App.scss';

function Message(props) {
  return <p className='message__bordered'>Your message: {props.text}</p>

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Message text='Hello, Geekbrains'/>
      </header>
    </div>
  );
}

export default App;
