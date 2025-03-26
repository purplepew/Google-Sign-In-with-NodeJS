import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AuthBtn from './AuthBtn'

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography>Logo</Typography>

        <Stack ml='auto' direction='row' alignItems='center' gap={1}>
          <AuthBtn />
        </Stack>
        
      </Toolbar>
    </AppBar>
  )
}

export default Header