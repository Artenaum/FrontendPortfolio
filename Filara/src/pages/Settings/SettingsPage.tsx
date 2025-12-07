import {Box} from '@mui/material'
import Sidebar from '../../widgets/Sidebar/Sidebar'
import Header from '../../widgets/Header/Header'
import styles from '../../shared/styles/Page.module.css'

const SettingsPage = () => {
    return (
        <Box className={styles.page}>
            <Sidebar disabledButton="settings" />
            <Header />
        </Box>
    )
}

export default SettingsPage
