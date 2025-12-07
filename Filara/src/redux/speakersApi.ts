import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {Speaker} from '../shared/types/speaker.types'
import {DB_URL} from '../shared/constants'

export const speakersApi = createApi({
    reducerPath: 'speakersApi',
    tagTypes: ['Speakers'],
    baseQuery: fetchBaseQuery({baseUrl: DB_URL}),
    endpoints: (build) => ({
        getSpeakers: build.query<Speaker[], void>({
            query: () => '/users'
        })
    })
})

export const {useGetSpeakersQuery} = speakersApi
