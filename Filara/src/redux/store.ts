import {configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector} from 'react-redux'
import citiesReducer from './citiesSlice'
import userReducer from './userSlice'
import {brandsApi} from './brandsApi'
import {seminarsApi} from './seminarsApi'
import {speakersApi} from './speakersApi'
import {citiesApi} from './citiesApi'
import {usersApi} from './usersApi'

export const store = configureStore({
    reducer: {
        [brandsApi.reducerPath]: brandsApi.reducer,
        [citiesApi.reducerPath]: citiesApi.reducer,
        [seminarsApi.reducerPath]: seminarsApi.reducer,
        [speakersApi.reducerPath]: speakersApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        cities: citiesReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(brandsApi.middleware)
            .concat(citiesApi.middleware)
            .concat(seminarsApi.middleware)
            .concat(speakersApi.middleware)
            .concat(usersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
