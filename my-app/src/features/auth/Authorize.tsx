import React from 'react'
import { Outlet } from 'react-router-dom'
import { useRefreshMutation } from './authApiSlice'
import { AppDispatch } from '../../lib/store'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'

const Authorize = () => {
    const [refresh] = useRefreshMutation()
    const dispatch = useDispatch<AppDispatch>()

    React.useEffect(() => {
        const fetchData = async () => {
            const { accessToken } = await refresh().unwrap()
            dispatch(setCredentials({ accessToken }))
        }
        fetchData()
    }, [])

    return <Outlet />
}

export default Authorize