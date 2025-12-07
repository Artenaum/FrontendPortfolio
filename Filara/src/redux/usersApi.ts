import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AUTH_URL} from '../shared/constants'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({baseUrl: AUTH_URL}),
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}]
        })
    })
})

export const {useLoginUserMutation} = usersApi
