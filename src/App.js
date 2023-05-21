import './App.css'
import Board from './components/Board';

function App() {

  return (
    <div className='app'>
      <h1 className='title-zone'>Крестики-нолики.онлайн</h1>
      Победителем является игрок, собравший ряд, колонну или диагональ своих символов
      <div className='board-zone'><Board/></div>
    </div>
  );
}

export default App;
