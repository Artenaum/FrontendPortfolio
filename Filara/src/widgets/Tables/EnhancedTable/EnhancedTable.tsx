import {
    Box,
    Checkbox,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'
import {useEffect, useState, type ChangeEvent} from 'react'
import Portal from '../../../shared/ui/Portal/Portal'
import SearchBar from '../../../shared/ui/SearchBar/SearchBar'
import type {GenericData} from '../../../shared/types/common.types'
import FilaraTablePagination from '../../../widgets/TablePagination/FilaraTablePagination'
import EnhancedTableBody from './EnhancedTableBody'

interface SearchBarProps {
    searchParam: string
    placeholder?: string
    portalLocation?: string
}

interface EnhancedTableProps {
    data: GenericData[]

    tableSetting: {
        header: string // Название
        headerKey: string // Название ключа
        editId?: number | string
        editKey?: string
    }[]

    searchbar?: SearchBarProps
    pagination?: boolean
    paginationPortalLocation?: string
    addRowSelection?: boolean

    sendChanges?: (id: number | string, changes: {}) => void
}

const EnhancedTable = (props: EnhancedTableProps) => {
    const [visibleData, setVisibleData] = useState<typeof props.data>([])
    const [selected, setSelected] = useState<readonly (string | number)[]>([])
    const [numSelected, setNumSelected] = useState<number>(selected.length)
    const [page, setPage] = useState<number>(0)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [searchQuery, setSearchQuery] = useState('')

    const changeCurrentPage = (newPage: number) => {
        setPage(newPage)
        setSelected([])
    }

    const changeItemsPerPage = (itemsPerPage: number) => {
        setItemsPerPage(itemsPerPage)
        setPage(0)
        setSelected([])
    }

    const getSearchQuery = (query: string) => {
        setSearchQuery(query)
        setPage(0)
        setSelected([])
    }

    const selectAllRows = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = visibleData.map((n) => n.id)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleCheckbox = (id: number | string) => {
        const selectedIndex = selected.indexOf(id)
        let newSelected: readonly (number | string)[] = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }
        setSelected(newSelected)
    }

    useEffect(() => {
        setNumSelected(selected.length)
    }, [selected])

    useEffect(() => {
        if (props.searchbar && props.pagination) {
            setVisibleData(
                [...props.data]
                    .filter((item) =>
                        Object.entries(item).find(
                            ([key, value]) =>
                                key === props.searchbar?.searchParam &&
                                String(value).toLowerCase().includes(searchQuery)
                        )
                    )
                    .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
            )
        } else if (props.searchbar) {
            setVisibleData(
                [...props.data].filter((item) =>
                    Object.entries(item).find(
                        ([key, value]) =>
                            key === props.searchbar?.searchParam &&
                            String(value).toLowerCase().includes(searchQuery)
                    )
                )
            )
        } else if (props.pagination) {
            setVisibleData(
                [...props.data].slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
            )
        } else {
            setVisibleData([...props.data])
        }
    }, [page, itemsPerPage, searchQuery, props.data])

    return (
        <Box>
            {props.searchbar && !props.searchbar.portalLocation && (
                <SearchBar placeholder={props.searchbar.placeholder} sendQuery={getSearchQuery} />
            )}
            {props.searchbar && props.searchbar.portalLocation && (
                <Portal
                    children={
                        <SearchBar
                            placeholder={props.searchbar?.placeholder}
                            sendQuery={getSearchQuery}
                        />
                    }
                    targetId={props.searchbar?.portalLocation!}
                />
            )}
            {props.pagination && !props.paginationPortalLocation && (
                <FilaraTablePagination
                    rowCount={props.data.length}
                    sendCurrentPage={changeCurrentPage}
                    sendItemsPerPage={changeItemsPerPage}
                />
            )}
            {props.pagination && props.paginationPortalLocation && (
                <Portal
                    children={
                        <FilaraTablePagination
                            rowCount={props.data.length}
                            sendCurrentPage={changeCurrentPage}
                            sendItemsPerPage={changeItemsPerPage}
                        />
                    }
                    targetId={props.paginationPortalLocation!}
                />
            )}
            <TableContainer sx={{maxHeight: 670}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {props.addRowSelection && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={
                                            numSelected > 0 && numSelected < visibleData.length
                                        }
                                        checked={
                                            visibleData.length > 0 &&
                                            numSelected === visibleData.length
                                        }
                                        onChange={selectAllRows}
                                    />
                                </TableCell>
                            )}

                            {props.tableSetting.map(({header}) => {
                                return (
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                color: '#737680',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {header}
                                        </Typography>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <EnhancedTableBody
                        data={visibleData}
                        tableSetting={props.tableSetting}
                        addRowSelection={props.addRowSelection}
                        selected={selected}
                        handleCheckbox={handleCheckbox}
                    />
                </Table>
            </TableContainer>
        </Box>
    )
}

export default EnhancedTable
