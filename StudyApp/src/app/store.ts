import { configureStore } from "@reduxjs/toolkit"
import { coursesSlice } from "./coursesSlice"
import { modulesSlice } from "./modulesSlice"
import { useDispatch, useSelector } from "react-redux"


export const store = configureStore({
	reducer: {
		course: coursesSlice.reducer,
		module: modulesSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector = useSelector.withTypes<RootState>()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()