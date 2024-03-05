import './App.css';
import Header from './components/Header/Header';
import ID from './components/ID/ID';
import CALL from './components/Call/call'
import VideoPlayer from './components/Video/Video';
function App() {
  return (
    <div>
      <Header/>
      <ID>
        <CALL/>
      </ID>
      <VideoPlayer/>
    </div>
  );
}

export default App;
