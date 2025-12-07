import {Box, IconButton, Typography} from '@mui/material'
import ExitIcon from '../../shared/ui/icons/ExitIcon'
import styles from './Header.module.css'
import {useAppSelector} from '../../redux/store'
import {getEmail} from '../../redux/userSlice'
import {useNavigate} from 'react-router'

const Header = () => {
    const navigate = useNavigate()
    const email = useAppSelector(getEmail)

    const handleLogout = () => {
        localStorage.removeItem('AccessToken')
        navigate('/auth')
    }

    return (
        <Box className={styles.header}>
            {email ? (
                <Typography className={styles.email}>{email}</Typography>
            ) : (
                <Typography className={styles.email}>Loading...</Typography>
            )}
            <IconButton
                size="medium"
                className={styles.exitBtn}
                onClick={handleLogout}
            >
                <ExitIcon fontSize="small" className={styles.icon} />
            </IconButton>
        </Box>
    )
}

export default Header
