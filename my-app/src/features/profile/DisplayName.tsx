import React from 'react'
import TextField from '@mui/material/TextField'

const DisplayName = ({ propName }: { propName?: string }) => {

    const [name, setName] = React.useState<string | undefined>(propName)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <TextField
            label='Display name'
            value={name}
            onChange={handleOnChange}
            sx={{
                '& > .MuiInputLabel-shrink': {
                    color: '#9f9f9f'
                }
            }}
        />
    )
}

export default DisplayName