import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {DB_URL} from '../shared/constants'
import type {Brand} from '../shared/types/brand.types'

export const brandsApi = createApi({
    reducerPath: 'brandsApi',
    tagTypes: ['Brands'],
    baseQuery: fetchBaseQuery({baseUrl: DB_URL}),
    endpoints: (build) => ({
        getBrands: build.query<Brand[], void>({
            query: () => '/brands'
        }),
        createBrand: build.mutation<void, Brand>({
            query: (body) => ({
                url: '/brands',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Brands', id: 'LIST'}]
        })
    })
})

export const {useGetBrandsQuery, useCreateBrandMutation} = brandsApi
