import {Box, Button, IconButton, Tab, Typography} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import Sidebar from '../../widgets/Sidebar/Sidebar'
import Header from '../../widgets/Header/Header'
import styles from '../../shared/styles/Page.module.css'
import seminarPageStyles from './SeminarsPage.module.css'
import PageContentHolder from '../../shared/ui/PageContentHolder/PageContentHolder'
import React, {useEffect, useState, type SyntheticEvent} from 'react'
import {useGetSeminarsQuery} from '../../redux/seminarsApi'
import {useGetSpeakersQuery} from '../../redux/speakersApi'
import EnhancedTable from '../../widgets/Tables/EnhancedTable/EnhancedTable'
import {DeleteOutline, FavoriteBorderRounded} from '@mui/icons-material'
import SeminarForm from '../../widgets/Forms/SeminarForm'

interface FutureSeminarData {
    id: number
    title: string
    fullName: string
    date: string
    status: 'application' | 'upcoming' | 'history'
    deleteBtn: React.ReactNode
}

interface HistorySeminarData {
    id: number
    title: string
    date: string
    likes: React.ReactNode
    status: 'application' | 'upcoming' | 'history'
    deleteBtn: React.ReactNode
}

interface RequestSeminarData {
    id: number
    title: string
    fullName: string
    phone: string
    date: string
    status: 'application' | 'upcoming' | 'history'
}

const SeminarsPage = () => {
    const [value, setValue] = useState('1')
    const [futureSeminarData, setFutureSeminarData] = useState<FutureSeminarData[]>([])
    const [historySeminarData, setHistorySeminarData] = useState<HistorySeminarData[]>([])
    const [requestSeminarData, setRequestSeminarData] = useState<RequestSeminarData[]>([])

    const [open, setOpen] = useState(false)

    const {data: seminarData} = useGetSeminarsQuery()
    const {data: speakerData} = useGetSpeakersQuery()

    useEffect(() => {
        if (seminarData?.length && speakerData?.length) {
            const futureSeminarResult = seminarData.map((seminar) => {
                const fullName = speakerData.find(
                    (speaker) => speaker.id === seminar.userId
                )!.fullName
                return {
                    id: seminar.id,
                    title: seminar.title,
                    fullName: fullName,
                    date: seminar.date,
                    status: seminar.status,
                    deleteBtn: (
                        <IconButton>
                            <DeleteOutline />
                        </IconButton>
                    )
                }
            })
            setFutureSeminarData(futureSeminarResult)

            const historySeminarResult = seminarData.map((seminar) => {
                const likes = seminar.likes ? seminar.likes : 0
                return {
                    id: seminar.id,
                    title: seminar.title,
                    date: seminar.date,
                    likes: (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                            {likes}
                            <IconButton>
                                <FavoriteBorderRounded color="primary" />
                            </IconButton>
                        </Box>
                    ),
                    status: seminar.status,
                    deleteBtn: (
                        <IconButton>
                            <DeleteOutline />
                        </IconButton>
                    )
                }
            })
            setHistorySeminarData(historySeminarResult)

            const requestSeminarResult = seminarData.map((seminar) => {
                const fullName = speakerData.find(
                    (speaker) => speaker.id === seminar.userId
                )!.fullName
                const phone = speakerData.find((speaker) => speaker.id === seminar.userId)!.phone
                return {
                    id: seminar.id,
                    title: seminar.title,
                    fullName,
                    phone,
                    date: seminar.date,
                    status: seminar.status
                }
            })
            setRequestSeminarData(requestSeminarResult)
        }
    }, [seminarData, speakerData])

    const changeTab = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const toggleForm = (newOpen: boolean) => {
        setOpen(newOpen)
    }

    return (
        <Box className={styles.page}>
            <Sidebar disabledButton="seminars" />
            <Box className={styles.headerAndContent}>
                <Header />
                <PageContentHolder>
                    <Box id="searchBarPortal" sx={{alignSelf: 'end'}}></Box>
                    <TabContext value={value}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <TabList
                                onChange={changeTab}
                                textColor="inherit"
                                sx={{
                                    width: 'fit-content'
                                }}
                            >
                                <Tab
                                    label="Будущие"
                                    value="1"
                                    className={seminarPageStyles.tab}
                                />
                                <Tab
                                    label="История"
                                    value="2"
                                    className={seminarPageStyles.tab}
                                />
                                <Tab
                                    label="Заявки на семинар"
                                    value="3"
                                    className={seminarPageStyles.tab}
                                />
                            </TabList>
                            <Box id="paginationPortal"></Box>
                        </Box>
                        <Box>
                            <TabPanel value="1" className={seminarPageStyles.tabPanel}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    disableElevation
                                    onClick={() => toggleForm(true)}
                                >
                                    <Typography sx={{textTransform: 'none', fontWeight: 500}}>
                                        Добавить семинар
                                    </Typography>
                                </Button>
                                <EnhancedTable
                                    // Отображение семинаров по статусу
                                    // data={futureSeminarData.filter(
                                    //     (item) => item.status === 'upcoming'
                                    // )}
                                    data={futureSeminarData}
                                    tableSetting={[
                                        {header: 'Название', headerKey: 'title'},
                                        {header: 'Спикер', headerKey: 'fullName'},
                                        {header: 'Дата', headerKey: 'date'},
                                        {header: '', headerKey: 'deleteBtn'}
                                    ]}
                                    addRowSelection
                                    searchbar={{
                                        searchParam: 'title',
                                        placeholder: 'Поиск по семинарам',
                                        portalLocation: 'searchBarPortal'
                                    }}
                                    pagination
                                    paginationPortalLocation="paginationPortal"
                                />
                            </TabPanel>
                            <TabPanel value="2" className={seminarPageStyles.tabPanel}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    disableElevation
                                    onClick={() => toggleForm(true)}
                                >
                                    <Typography sx={{textTransform: 'none', fontWeight: 500}}>
                                        Добавить семинар
                                    </Typography>
                                </Button>
                                <EnhancedTable
                                    // Отображение семинаров по статусу
                                    // data={historySeminarData.filter(
                                    //     (item) => item.status === 'history'
                                    // )}
                                    data={historySeminarData}
                                    tableSetting={[
                                        {header: 'Название', headerKey: 'title'},
                                        {header: 'Дата', headerKey: 'date'},
                                        {header: '', headerKey: 'likes'},
                                        {header: '', headerKey: 'deleteBtn'}
                                    ]}
                                    addRowSelection
                                    searchbar={{
                                        searchParam: 'title',
                                        placeholder: 'Поиск по семинарам',
                                        portalLocation: 'searchBarPortal'
                                    }}
                                    pagination
                                    paginationPortalLocation="paginationPortal"
                                />
                            </TabPanel>
                            <TabPanel value="3" className={seminarPageStyles.tabPanel}>
                                <EnhancedTable
                                    // Отображение семинаров по статусу
                                    // data={requestSeminarData.filter(
                                    //     (item) => item.status === 'application'
                                    // )}
                                    data={requestSeminarData}
                                    tableSetting={[
                                        {header: 'Название семинара', headerKey: 'title'},
                                        {header: 'Пользователь', headerKey: 'fullName'},
                                        {header: 'Номер телефона', headerKey: 'phone'},
                                        {header: 'Дата', headerKey: 'date'}
                                    ]}
                                    searchbar={{
                                        searchParam: 'title',
                                        placeholder: 'Поиск по семинарам',
                                        portalLocation: 'searchBarPortal'
                                    }}
                                    pagination
                                    paginationPortalLocation="paginationPortal"
                                />
                            </TabPanel>
                        </Box>
                    </TabContext>
                </PageContentHolder>
            </Box>
            <SeminarForm open={open} toggleForm={toggleForm} />
        </Box>
    )
}

export default SeminarsPage
