import React, { JSX } from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import GoogleIcon from '@mui/icons-material/Google'
import ProfileBtn from './ProfileBtn'
import useCredentials from '../../hooks/useCredentials'

const AuthBtn = () => {
    const [errMsg, setErrMsg] = React.useState<string | null>(null)

    const { image, name} = useCredentials()

    const handleCloseErr = () => setErrMsg(null)

    const handleSignIn = React.useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3500/auth/google')
            const { url } = await response.json()
            window.location.href = url
        } catch (error) {
            setErrMsg('Internal server error')
        }
    }, []
    )



    let button: JSX.Element

    if (image || name) {
        button = <ProfileBtn image={image} name={name} />
    } else {
        button = <Button onClick={handleSignIn} color='secondary' variant='outlined' startIcon={<GoogleIcon />}>Sign in</Button>
    }

    return (
        <>
            {button}
            {errMsg && <Snackbar open={Boolean(errMsg)} message={errMsg} autoHideDuration={3000} onClose={handleCloseErr} />}
        </>
    )
}

export default AuthBtn