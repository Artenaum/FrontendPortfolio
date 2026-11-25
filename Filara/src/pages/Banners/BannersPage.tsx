import {Box} from '@mui/material'
import Sidebar from '../../widgets/Sidebar/Sidebar'
import Header from '../../widgets/Header/Header'
import styles from '../../shared/styles/Page.module.css'

const BannersPage = () => {
    return (
        <Box className={styles.page}>
            <Sidebar disabledButton="banners" />
            <Box className={styles.headerAndContent}>
                <Header />
            </Box>
        </Box>
    )
}

export default BannersPage
