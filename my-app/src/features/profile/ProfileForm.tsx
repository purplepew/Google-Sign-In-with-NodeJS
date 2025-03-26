import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const ProfileForm = () => {

    const ColorBox = ({ bgColor, label }: { bgColor: string, label: string }) => {
        return (
            <Box>
                <Box component='button' sx={{ backgroundColor: bgColor, width: '3rem', height: '3rem', display: 'flex', justifyContent: 'end', cursor: 'pointer', border: 'none' }}>
                    <EditIcon fontSize='small' color='secondary' />
                </Box>
                <Typography variant='caption'>{label}</Typography>
            </Box>
        )
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', p: '2rem' }}>
            <Box component={Paper} sx={{ width: 300, minHeight: 525, p: '1rem', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography>Profile</Typography>
                <Divider />
                <TextField
                    label='Display name'
                    sx={{
                        '& > .MuiInputLabel-shrink': {
                            color: '#9f9f9f'
                        }
                    }}
                />
                <TextField
                    label='Add your pronouns'
                    sx={{
                        '& > .MuiInputLabel-shrink': {
                            color: '#9f9f9f'
                        }
                    }}
                />

                <Divider />

                <Button color='secondary' variant='contained' sx={{ mr: 'auto' }} size='small'>Change Avatar</Button>

                <Divider />

                <Button color='secondary' variant='contained' sx={{ mr: 'auto' }} size='small'>Profile Banner</Button>

                <Divider />

                <Typography variant='body2'>Profile Theme</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <ColorBox bgColor='firebrick' label='Primary' />
                    <ColorBox bgColor='hotpink' label='Secondary' />
                </Box>

                <Divider />

                <Typography variant='body2'>About me</Typography>
                <Typography variant='caption'>Tell others something about you.</Typography>

                <TextField variant='outlined' multiline rows={3}/>
            </Box>
        </Container >
    )
}

export default ProfileForm