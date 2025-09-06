import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AnimatedPage from '@/pages/AnimatedPage'
import ComponentsPage from '@/pages/ComponentsPage'
import SimplePage from '@/pages/SimplePage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SimplePage />} />
        <Route path='/components' element={<ComponentsPage />} />
        <Route path='/animated' element={<AnimatedPage />} />
      </Routes>
    </Router>
  )
}
