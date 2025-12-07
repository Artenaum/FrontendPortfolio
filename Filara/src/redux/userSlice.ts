import {createSlice} from '@reduxjs/toolkit'
import type {User} from '../shared/types/user.types'
import type {RootState} from './store'

const initialState: User = {
    id: 0,
    name: '',
    password: '',
    email: '',
    role: 'student'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser(state, action) {
            return action.payload
        }
    }
})

export const {storeUser} = userSlice.actions
export const getEmail = (state: RootState) => state.user.email
export default userSlice.reducer
