import type {ReactNode} from 'react'
import {Navigate, Outlet} from 'react-router'

interface ProtectedRouteProps {
    redirectPath?: string
    children?: ReactNode
}

const ProtectedRoute = ({
    redirectPath = '/auth',
    children
}: ProtectedRouteProps) => {
    const accessToken = localStorage.getItem('AccessToken')

    if (!accessToken) {
        return <Navigate to={redirectPath} replace />
    }

    return children ? children : <Outlet />
}

export default ProtectedRoute
