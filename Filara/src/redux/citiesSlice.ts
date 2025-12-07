import {createSlice} from '@reduxjs/toolkit'
import type {City} from '../shared/types/city.types'
import type {RootState} from './store'

interface CitiesState {
    cities: City[]
}

const initialState: CitiesState = {
    cities: []
}

const citiesSlice = createSlice({
    name: 'cities',
    initialState: initialState,
    reducers: {
        storeCities(state, action) {
            console.log(action.payload)
            return action.payload
        }
    }
})

export const {storeCities} = citiesSlice.actions
export const getCities = (state: RootState) => state.cities.cities
export default citiesSlice.reducer
