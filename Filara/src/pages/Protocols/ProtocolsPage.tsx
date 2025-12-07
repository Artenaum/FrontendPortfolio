import {Box} from '@mui/material'
import Sidebar from '../../widgets/Sidebar/Sidebar'
import Header from '../../widgets/Header/Header'
import styles from '../../shared/styles/Page.module.css'

const ProtocolsPage = () => {
    return (
        <Box className={styles.page}>
            <Sidebar disabledButton="protocols" />
            <Header />
        </Box>
    )
}

export default ProtocolsPage
