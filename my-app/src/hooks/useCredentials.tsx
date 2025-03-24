import { selectCurrentToken } from "../features/auth/authSlice"
import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"

type DecodedToken = {
    UserInfo: {
        googleId: string,
        email: string,
        name: string,
        image: string
    }
}

const useCredentials = () => {
    const token = useSelector(selectCurrentToken)
    if (token) {
        const decoded = jwtDecode<DecodedToken>(token)
        const googleId = decoded.UserInfo.googleId
        const name = decoded.UserInfo.name
        const email = decoded.UserInfo.email

        return { googleId, name, email }
    }
    return { googleId: '', name: '', email: '' }
}

export default useCredentials