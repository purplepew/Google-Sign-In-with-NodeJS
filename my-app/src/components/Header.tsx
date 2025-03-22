import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import GoogleIcon from '@mui/icons-material/Google'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { useLogoutMutation } from '../features/auth/authApiSlice'

const Header = () => {
  const token = useSelector(selectCurrentToken)

  const [logout] = useLogoutMutation()

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3500/auth/google')
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
    console.log(error)      
  }
  }
  
  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } catch (error) {
      console.log(error)      
    }
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography>Logo</Typography> 
        <Stack ml='auto'>
          {!token && <Button onClick={handleSignIn} color='secondary' variant='outlined' startIcon={<GoogleIcon />}>Sign in</Button>}
          {token && <Button onClick={handleLogout} color='secondary' variant='outlined' startIcon={<LogoutIcon />}>Logout</Button>}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header