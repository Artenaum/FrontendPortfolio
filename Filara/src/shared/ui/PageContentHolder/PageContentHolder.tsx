import {Box} from '@mui/material'
import styles from './PageContentHolder.module.css'
import type {ReactElement} from 'react'

const PageContentHolder = ({children}: {children: ReactElement[]}) => {
    return <Box className={styles.contentHolder}>{children}</Box>
}

export default PageContentHolder
