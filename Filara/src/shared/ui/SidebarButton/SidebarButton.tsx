import {Button} from '@mui/material'
import type React from 'react'
import type {PropsWithChildren} from 'react'
import {useNavigate} from 'react-router'
import styles from './SidebarButton.module.css'

interface SidebarButtonProps {
    icon: React.ReactNode | string
    text: string
    route: string
    disabled: boolean
}

const SidebarButton: React.FC<PropsWithChildren<SidebarButtonProps>> = ({
    icon,
    text,
    route,
    disabled
}) => {
    const navigate = useNavigate()

    return (
        <Button
            className={styles.sidebarButton}
            disabled={disabled}
            variant="contained"
            disableElevation
            startIcon={icon}
            onClick={() => navigate(route)}
        >
            {text}
        </Button>
    )
}

export default SidebarButton
