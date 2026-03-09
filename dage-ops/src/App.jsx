import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CityXpressOps from './pages/CityXpressOps'
import AmoahTraitsOps from './pages/AmoahTraitsOps'
import SchoolsOps from './pages/SchoolsOps'
import NemokOps from './pages/NemokOps'
import IssuesOps from './pages/IssuesOps'
import CreditUnionOps from './pages/CreditUnionOps'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="ops/city-xpress" element={<CityXpressOps />} />
            <Route path="ops/amoah-traits" element={<AmoahTraitsOps />} />
            <Route path="ops/schools" element={<SchoolsOps />} />
            <Route path="ops/nemok-lodge" element={<NemokOps />} />
            <Route path="ops/credit-union" element={<CreditUnionOps />} />
            <Route path="ops/issues" element={<IssuesOps />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
