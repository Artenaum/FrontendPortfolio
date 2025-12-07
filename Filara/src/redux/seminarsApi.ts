import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {Seminar} from '../shared/types/seminar.types'
import {DB_URL} from '../shared/constants'

export const seminarsApi = createApi({
    reducerPath: 'seminarsApi',
    tagTypes: ['Seminars'],
    baseQuery: fetchBaseQuery({baseUrl: DB_URL}),
    endpoints: (build) => ({
        getSeminars: build.query<Seminar[], void>({
            query: () => '/seminars'
        }),
        createSeminar: build.mutation<void, Seminar>({
            query: (body) => ({
                url: '/seminars',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Seminars', id: 'LIST'}]
        })
    })
})

export const {useGetSeminarsQuery, useCreateSeminarMutation} = seminarsApi
