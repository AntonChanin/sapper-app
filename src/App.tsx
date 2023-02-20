import { Route, Routes } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import GamePage from './pages/GamePage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

const App = () => {
  
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/leader-board" element={<LeaderBoardPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
