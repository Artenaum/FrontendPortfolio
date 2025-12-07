import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from '@mui/material'
import {NavigateBeforeRounded, NavigateNextRounded} from '@mui/icons-material'
import styles from './TablePagination.module.css'
import {useEffect, useState, type FC} from 'react'

interface FilaraTablePaginationProps {
    rowCount: number
    sendItemsPerPage: (items: number) => void
    sendCurrentPage: (page: number) => void
}

const FilaraTablePagination: FC<FilaraTablePaginationProps> = ({
    rowCount,
    sendItemsPerPage,
    sendCurrentPage
}) => {
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)

    const selectItemsPerPage = (event: any) => {
        setItemsPerPage(parseInt(event.target.value, 10))
        setCurrentPage(1)
    }

    useEffect(() => {
        setTotalPages(Math.ceil(rowCount / itemsPerPage))
    }, [itemsPerPage, rowCount, currentPage])

    useEffect(() => {
        if (totalPages === 1) {
            setPreviousButtonDisabled(true)
            setNextButtonDisabled(true)
        } else if (currentPage === 1) {
            setPreviousButtonDisabled(true)
            setNextButtonDisabled(false)
        } else if (currentPage === totalPages) {
            setPreviousButtonDisabled(false)
            setNextButtonDisabled(true)
        } else {
            setPreviousButtonDisabled(false)
            setNextButtonDisabled(false)
        }
    }, [totalPages, currentPage])

    useEffect(() => {
        sendItemsPerPage(itemsPerPage)
    }, [itemsPerPage])

    useEffect(() => {
        const visiblePage = currentPage - 1
        sendCurrentPage(visiblePage)
    }, [currentPage])

    const previousPage = () => {
        if (currentPage === 1) return
        setCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
        if (currentPage === totalPages) return
        setCurrentPage(currentPage + 1)
    }

    return (
        <Box className={styles.pagination}>
            <FormControl sx={{flexDirection: 'row', gap: '8px'}}>
                <Typography
                    sx={{
                        color: '#434652',
                        fontSize: '14px',
                        alignSelf: 'center'
                    }}
                >
                    Показывать
                </Typography>
                <Select
                    id="item-num-select"
                    className={styles.itemNumSelect}
                    value={itemsPerPage}
                    onChange={selectItemsPerPage}
                    sx={{
                        '& .MuiSelect-select': {
                            paddingTop: '6px',
                            paddingLeft: '8px',
                            paddingBottom: '6px'
                        }
                    }}
                >
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'10'}>10</MenuItem>
                    <MenuItem value={'25'}>25</MenuItem>
                    <MenuItem value={'50'}>50</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{flexDirection: 'row', gap: '4px'}}>
                <Typography
                    sx={{
                        color: '#434652',
                        fontSize: '14px',
                        alignSelf: 'center',
                        marginRight: '4px'
                    }}
                >
                    Страница
                </Typography>
                <OutlinedInput
                    readOnly
                    className={styles.pageSelect}
                    value={currentPage}
                    //onChange={changePage}
                />
                <Typography
                    sx={{
                        color: '#BCBFCC',
                        fontSize: '14px',
                        alignSelf: 'center'
                    }}
                >
                    из {totalPages}
                </Typography>
            </FormControl>
            <ButtonGroup
                variant="outlined"
                sx={{
                    '& .MuiButton-root': {
                        color: '#414348',
                        borderColor: '#d0d3da'
                    }
                }}
            >
                <Button
                    disabled={previousButtonDisabled}
                    onClick={previousPage}
                    sx={{width: '32px'}}
                >
                    <NavigateBeforeRounded />
                </Button>
                <Button disabled={nextButtonDisabled} onClick={nextPage} sx={{width: '32px'}}>
                    <NavigateNextRounded />
                </Button>
            </ButtonGroup>
        </Box>
    )
}

export default FilaraTablePagination
