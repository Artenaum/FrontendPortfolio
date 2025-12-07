import {Box, Drawer, IconButton, useMediaQuery} from '@mui/material'
import styles from './Sidebar.module.css'
import SidebarButton from '../../shared/ui/SidebarButton/SidebarButton'
import SidebarProductIcon from '../../shared/ui/icons/SidebarProductIcon'
import SidebarFolderIcon from '../../shared/ui/icons/SidebarFolderIcon'
import SidebarStoreIcon from '../../shared/ui/icons/SidebarStoreIcon'
import SidebarTagIcon from '../../shared/ui/icons/SidebarTagIcon'
import SidebarUserIcon from '../../shared/ui/icons/SidebarUserIcon'
import SidebarMapIcon from '../../shared/ui/icons/SidebarMapIcon'
import SidebarStarIcon from '../../shared/ui/icons/SidebarStarIcon'
import SidebarSignFlatIcon from '../../shared/ui/icons/SidebarSignFlatIcon'
import SidebarSignHangingIcon from '../../shared/ui/icons/SidebarSignHangingIcon'
import SidebarDollarIcon from '../../shared/ui/icons/SidebarDollarIcon'
import SidebarGearIcon from '../../shared/ui/icons/SidebarGearIcon'
import MenuIcon from '@mui/icons-material/Menu'
import {useState} from 'react'

const Sidebar = ({disabledButton}: {disabledButton: string}) => {
    const isMobile: boolean = useMediaQuery('(max-width: 1000px)')
    const [drawerOpen, setDrawerOpen] = useState(false)

    const sidebarButtons = (
        <Box className={styles.sidebarBtnList}>
            <SidebarButton
                icon={<SidebarUserIcon />}
                text="Заявки"
                route="/requests"
                disabled={disabledButton === 'requests'}
            />

            <SidebarButton
                icon={<SidebarProductIcon />}
                text="Продукты"
                route="/products"
                disabled={disabledButton === 'products'}
            />

            <SidebarButton
                icon={<SidebarUserIcon />}
                text="Пользователи"
                route="/users"
                disabled={disabledButton === 'users'}
            />

            <SidebarButton
                icon={<SidebarFolderIcon />}
                text="Категории"
                route="/categories"
                disabled={disabledButton === 'categories'}
            />

            <SidebarButton
                icon={<SidebarMapIcon />}
                text="Города"
                route="/cities"
                disabled={disabledButton === 'cities'}
            />

            <SidebarButton
                icon={<SidebarStarIcon />}
                text="Бренды"
                route="/brands"
                disabled={disabledButton === 'brands'}
            />

            <SidebarButton
                icon={<SidebarStoreIcon />}
                text="Протоколы"
                route="/protocols"
                disabled={disabledButton === 'protocols'}
            />

            <SidebarButton
                icon={<SidebarTagIcon />}
                text="Заказы"
                route="/orders"
                disabled={disabledButton === 'orders'}
            />

            <SidebarButton
                icon={<SidebarSignFlatIcon />}
                text="Баннеры"
                route="/banners"
                disabled={disabledButton === 'banners'}
            />

            <SidebarButton
                icon={<SidebarSignHangingIcon />}
                text="Семинары"
                route="/seminars"
                disabled={disabledButton === 'seminars'}
            />

            <SidebarButton
                icon={<SidebarDollarIcon />}
                text="Промокоды"
                route="/promocodes"
                disabled={disabledButton === 'promocodes'}
            />

            <SidebarButton
                icon={<SidebarGearIcon />}
                text="Настройки"
                route="/settings"
                disabled={disabledButton === 'settings'}
            />
        </Box>
    )

    const handleDrawerOpen = () => {
        setDrawerOpen(true)
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }

    return (
        <Box>
            {isMobile ? (
                <Box className={styles.flexBoxRow}>
                    <IconButton onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Box>
                        <img src="/src/shared/assets/logo.svg" width="100" />
                    </Box>
                    <Drawer open={drawerOpen} onClose={handleDrawerClose}>
                        {sidebarButtons}
                    </Drawer>
                </Box>
            ) : (
                <Box className={styles.sidebar}>
                    <Box sx={{marginTop: '50px'}}>
                        <img src="/src/shared/assets/logo.svg" width="100" />
                    </Box>
                    {sidebarButtons}
                </Box>
            )}
        </Box>
    )

    // return (
    //     <Box className={styles.sidebar}>
    //         <Box sx={{marginTop: '50px'}}>
    //             <img src="/src/shared/assets/logo.svg" width="100" />
    //         </Box>
    //         {sidebarButtons}
    //     </Box>
    // )
}

export default Sidebar
