import React from 'react'
import { useLogoutMutation } from '../../features/auth/authApiSlice'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

const ProfileBtn = ({ image, name }: { image: string, name: string }) => {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const openMenu = Boolean(anchorEl)
    

    const [logout] = useLogoutMutation()

    const handleOpenMenu = React.useCallback((e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget), [])
    const handleCloseMenu = React.useCallback(() => setAnchorEl(null), [])

    const handleLogout = React.useCallback(async () => {
        try {
            await logout().unwrap()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleSettings = () => {
        navigate('/profile')
    }


    return (
        <>
            <Typography>{name}</Typography>
            <Avatar src={image} component='button' onClick={handleOpenMenu} sx={{ cursor: 'pointer', border: 'none'}} />
            <Menu open={openMenu} anchorEl={anchorEl} onClose={handleCloseMenu}>
                <List dense sx={{ p: 0 }}>

                    <ListItemButton onClick={handleSettings}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Settings' />
                    </ListItemButton>

                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon color='error' />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItemButton>

                </List>
            </Menu>
        </>
    )
}

export default ProfileBtn