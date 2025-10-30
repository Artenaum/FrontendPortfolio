import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Course } from "../types/types"

interface CoursesData {
	courses: Course[]
	status: string
	error: string
}

export const fetchCourses = createAsyncThunk(
	'course/fetchCourses',
	async function(_, {rejectWithValue}) {
		try {
			const response = await fetch('http://localhost:3000/courses')

			if (!response.ok) {
				throw new Error('Server Error!')
			}

			const data = await response.json()
			return data
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const createCourse = createAsyncThunk(
	'course/createCourse',
	async function(course: Course, {rejectWithValue}) {
		try {
			const response = await fetch('http://localhost:3000/courses', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(course)
			})

			if (!response.ok) {
				throw new Error('Cannot create course. Server error.')
			}

			const data = await response.json()
			return data
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const coursesSlice = createSlice({
	name: 'course',
	initialState: {
		courses: [],
		status: 'loading',
		error: '',
	} satisfies CoursesData as CoursesData,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.pending, (state) => {
				state.status = 'loading'
				state.error = ''
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				state.status = 'resolved'
				state.courses = action.payload
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = String(action.payload)
			})
	}
})

//export const { setName, setDescription } = coursesSlice.actions
export default coursesSlice.reducer