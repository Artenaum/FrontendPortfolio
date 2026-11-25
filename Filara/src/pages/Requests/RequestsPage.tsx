import {Box} from '@mui/material'
import Sidebar from '../../widgets/Sidebar/Sidebar'
import Header from '../../widgets/Header/Header'
import styles from '../../shared/styles/Page.module.css'

const RequestsPage = () => {
    return (
        <Box className={styles.page}>
            <Sidebar disabledButton="requests" />
            <Box className={styles.headerAndContent}>
                <Header />
            </Box>
        </Box>
    )
}

export default RequestsPage
