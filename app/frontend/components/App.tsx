import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import { AuthProvider } from '../contexts/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='*' element={<MainPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
