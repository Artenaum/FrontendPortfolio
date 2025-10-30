import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Module } from "../types/types"

interface ModulesData {
	modules: Module[]
	status: string
	error: string
}

export const fetchModules = createAsyncThunk(
	'modules/fetchModules',
	async function(_, {rejectWithValue}) {
		try {
			const response = await fetch('http://localhost:3000/modules')

			if (!response.ok) {
				throw new Error('Server Error!')
			}

			const data = response.json()
			return data
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const createModule = createAsyncThunk(
	'modules/createModule',
	async function(module: Module, {rejectWithValue}) {
		try {
			const response = await fetch('http://localhost:3000/modules', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(module)
			})

			if (!response.ok) {
				throw new Error('Cannot create module. Server error.')
			}

			const data = await response.json()
			return data
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const modulesSlice = createSlice({
	name: 'module',
	initialState: {
		modules: [],
		status: 'loading',
		error: '',
	} satisfies ModulesData as ModulesData,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchModules.pending, (state) => {
				state.status = 'loading'
				state.error = ''
			})
			.addCase(fetchModules.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.modules = action.payload
			})
			.addCase(fetchModules.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = String(action.payload)
			})
	}
})

//export const { setName, setDescription, setCourse } = modulesSlice.actions
export default modulesSlice.reducer