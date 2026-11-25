import {Box} from '@mui/material'
import Sidebar from '../../widgets/Sidebar/Sidebar'
import Header from '../../widgets/Header/Header'
import styles from '../../shared/styles/Page.module.css'

const OrdersPage = () => {
    return (
        <Box className={styles.page}>
            <Sidebar disabledButton="orders" />
            <Box className={styles.headerAndContent}>
                <Header />
            </Box>
        </Box>
    )
}

export default OrdersPage
