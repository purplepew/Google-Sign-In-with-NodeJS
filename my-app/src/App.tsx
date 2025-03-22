import { Routes, Route } from 'react-router-dom'
import Public from './components/Public'
import Layout from './components/Layout'
import Authorize from './features/auth/Authorize'
import Public2 from './components/Public2'

function App() {
  return (
    <Routes>
      <Route element={<Authorize />} >
        <Route path='/' element={<Layout />} >
          <Route index element={<Public />} />

          <Route path='/public2' element={<Public2 />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
