import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Schools from './pages/Schools'
import NemokLodge from './pages/NemokLodge'
import CityXpress from './pages/CityXpress'
import AmoahTraits from './pages/AmoahTraits'
import DageBakery from './pages/DageBakery'
import CreditUnion from './pages/CreditUnion'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/nemok-lodge" element={<NemokLodge />} />
            <Route path="/city-xpress" element={<CityXpress />} />
            <Route path="/amoah-traits" element={<AmoahTraits />} />
            <Route path="/dage-bakery" element={<DageBakery />} />
            <Route path="/credit-union" element={<CreditUnion />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
