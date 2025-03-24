import { Routes, Route } from 'react-router-dom'
import Public from './components/Public'
import Layout from './components/Layout'
import Authorize from './features/auth/Authorize'
import Public2 from './components/Public2'
import Login from './components/Login'

function App() {
  return (
    <Routes>
      <Route element={<Authorize />} >
        <Route path='/' element={<Layout />} >
          <Route index element={<Public />} />

          <Route path='/public2' element={<Public2 />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
