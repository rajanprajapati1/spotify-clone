import React from 'react'
import Sidebar from './components/Sidebar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Player from './components/Player'
import Searchpage from './pages/Searchpage'
import ArtistsPage from './pages/ArtistsPage'
import { SongProvider } from './utils/Context';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <div style={styles.container}>
      <SongProvider>
        <Sidebar />
        <div style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/search" element={<Searchpage />}/>
            <Route path="/artist/:ArtistName" element={<ArtistsPage />}/>
          </Routes>
        </div>
        <Player />
        </SongProvider>
      </div>
      </BrowserRouter>
    </div>
    )
}
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden', // Prevents vertical scrollbar
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto', // Allows main content to scroll if needed
  },
};
export default App
