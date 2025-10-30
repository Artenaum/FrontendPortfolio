import { AppBar, Box, Button, IconButton, TextField, Toolbar, Typography } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { useAppDispatch } from "../app/store"
import { createCourse } from "../app/coursesSlice"
import type { Course } from "../types/types"

interface CourseFormInput {
	title: string
	description: string
}

const CreateCourseForm = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const {control, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			title: '',
			description: '',
		}
	})

	const onSubmit: SubmitHandler<CourseFormInput> = async (data) => {
		const course: Course = {
			title: data.title,
			description: data.description,
			imageUrl: '',
			category: '',
		}

		const resp = await dispatch(createCourse(course))

		if (resp) navigate('/?addedCourse=true')
	}

	return (
		<>
			<AppBar position="static">
				<Toolbar sx={{alignItems: 'center', justifyContent: 'center'}}>
					<IconButton 
						aria-label="delete" 
						sx={{color: 'white', marginRight: 'auto'}}
						onClick={() => navigate('/')}
					>
						<ArrowBack/>
					</IconButton>
					<Typography variant="h4">Создать курс</Typography>
					<Box sx={{marginLeft: 'auto'}}/>
				</Toolbar>
			</AppBar>

			<Box
				sx={{
					marginTop: '50px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '30px'
			}}>
				<Controller
					name="title"
					control={control}
					rules={{
						required: 'Введите название'
					}}
					render={({
						field: {onChange, value},
					}) => (
						<TextField
							helperText={errors.title ? errors.title.message : null}
							error={!!errors.title}
							onChange={onChange}
							value={value}
							required
							id="course-title"
							label="Название курса"
							sx={{width: '500px'}}
						/>
					)}
				/>

				<Controller
					name="description"
					control={control}
					rules={{
						required: 'Введите описание'
					}}
					render={({
						field: {onChange, value},
					}) => (
						<TextField
							helperText={errors.description ? errors.description.message : null}
							error={!!errors.description}
							onChange={onChange}
							value={value}
							required
							id="course-desc"
							label="Описание курса"
							multiline
							rows={4}
							sx={{width: '500px'}}
						/>
					)}
				/>
				
				<Button
					variant="contained"
					disableElevation
					onClick={handleSubmit(onSubmit)}
				>
					Создать
				</Button>
			</Box>
		</>
	)
}

export default CreateCourseForm
