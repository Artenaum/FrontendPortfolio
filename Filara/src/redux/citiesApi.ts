import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {DB_URL} from '../shared/constants'
import {type City} from '../shared/types/city.types'
import {storeCities} from './citiesSlice'

export const citiesApi = createApi({
    reducerPath: 'citiesApi',
    tagTypes: ['Cities'],
    baseQuery: fetchBaseQuery({baseUrl: DB_URL}),
    endpoints: (build) => ({
        getCities: build.query<City[], void>({
            query: () => '/cities'
        })
    })
})

export const {useGetCitiesQuery} = citiesApi
