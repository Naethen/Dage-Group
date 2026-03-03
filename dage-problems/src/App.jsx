import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Submit from './pages/Submit'
import Track from './pages/Track'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit/:subsidiary" element={<Submit />} />
          <Route path="/track" element={<Track />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
