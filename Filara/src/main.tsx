import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router'
import {StyledEngineProvider, ThemeProvider} from '@mui/material'
import {theme} from './themes/MainTheme.ts'
import {Provider} from 'react-redux'
import {store} from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </ThemeProvider>
            </StyledEngineProvider>
        </BrowserRouter>
    </StrictMode>
)
