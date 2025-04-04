import React from 'react'
import Button from '@mui/material/Button'
import { useUploadFileMutation, useChangeDisplayPictureMutation } from './profileApiSlice'
import useCredentials from '../../hooks/useCredentials'

const DisplayPicture = () => {
    const { googleId } = useCredentials()

    const [file, setFile] = React.useState<File | null>(null)
    const [preview, setPreview] = React.useState<string | ArrayBuffer | undefined>()

    const [uploadFile] = useUploadFileMutation()
    const [changeDp] = useChangeDisplayPictureMutation()

    const handleOnChange = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement & { files: File }

        if (target.files && target.files[0]) {
            const selectedFile = target.files[0]
            setFile(selectedFile)

            const previewUrl = URL.createObjectURL(selectedFile)
            setPreview(previewUrl)
        }
    }

    const handleUpload = async () => {
        if (!file) {
            console.log('no file selected')
            return
        }
        console.log(1)
        const formData = new FormData()
        formData.append('file', file)
        
        try {
            if(!googleId){
                console.log('not signedin')
                return 
            }
            console.log(2)
            const {imgUrl} = await uploadFile(formData).unwrap()
            await changeDp({ googleId, imgUrl }).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button color='secondary' variant='contained' component='label' sx={{ mr: 'auto' }} size='small'>
                Change Avatar
                <input type='file' hidden onChange={handleOnChange} />
            </Button>
            {preview && <img src={preview as string} height={100} width={100} />}
            <Button onClick={handleUpload}>Upload</Button>
        </>
    )
}

export default DisplayPicture