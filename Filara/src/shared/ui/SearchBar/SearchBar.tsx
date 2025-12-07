import {IconButton, InputAdornment, OutlinedInput} from '@mui/material'
import {CloseRounded, Search} from '@mui/icons-material'
import '../../global.css'
import inputStyles from '../../styles/Inputs.module.css'
import {useEffect, useState} from 'react'

interface SearchBarProps {
    placeholder?: string
    sendQuery: (query: string) => void
}

const SearchBar = ({placeholder, sendQuery}: SearchBarProps) => {
    const [query, setQuery] = useState('')

    const clearSearch = () => {
        setQuery('')
    }

    useEffect(() => {
        sendQuery(query.trim().toLowerCase())
    }, [query])

    return (
        <OutlinedInput
            className={`${inputStyles.commonInput} ${inputStyles.textInputRegular}`}
            startAdornment={
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            }
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton size="small" onClick={clearSearch}>
                        <CloseRounded fontSize="small" />
                    </IconButton>
                </InputAdornment>
            }
            sx={{width: '320px'}}
        ></OutlinedInput>
    )
}

export default SearchBar
