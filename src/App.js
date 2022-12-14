import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Chat from './components/Chat';
import { useState } from 'react';
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import FileBrowser from './components/FileBrowser';

function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login/>
        ) : (
          <>
        <Header />
        <div className='app__body'>
          <Sidebar />
          
          <Routes>
            <Route path='/room/:roomId' element={<Chat />} />
              
            <Route path='/File browser' element={<FileBrowser/>} />
            <Route path='/' element={<h1>Welcome!</h1>} />
          </Routes>
          
          {/* {REACT ROUTER-> CHAT SCREEN} */}
        </div>
        </>
        )}
      </Router>
    </div>
  );
}

export default App;
