
import Home from './Components/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import FilmDetails from './Components/FilmDetails.jsx'
import Loading from './Components/Loading.jsx'
import Collections from './Components/Collections.jsx'
import Favorites from './Components/Favorites.jsx'
import Context from './Context/Context.jsx'
import WatchLater from './Components/WatchLater.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'
function App() {

  return (
    <>
      <NavBar />
      <Loading/>
      <ScrollToTop/>
      <Context>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collections' element={<Collections/>} />
        <Route path='/favorites' element={<Favorites/>} />
        <Route path='/watchlater' element={<WatchLater/>} />
        <Route path='/details' element={<FilmDetails />} />
      </Routes>
      </Context>
    </>
  )
}

export default App
