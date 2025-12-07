import {createTheme} from '@mui/material/styles'

export const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d0d3da',
                        borderWidth: '1px'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8a3597',
                        borderWidth: '1px'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8a3597',
                        borderWidth: '2px'
                    }
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-notchedOutline': {
                        borderColor: '#d0d3da',
                        borderWidth: '1px'
                    },
                    '&:hover .MuiInputBase-notchedOutline': {
                        borderColor: '#8a3597',
                        borderWidth: '1px'
                    },
                    '&.Mui-focused .MuiInputBase-notchedOutline': {
                        borderColor: '#8a3597',
                        borderWidth: '2px'
                    }
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#C06ECC'
        }
    }
})
