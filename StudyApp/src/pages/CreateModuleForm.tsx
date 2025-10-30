import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../app/store"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import type { Module } from "../types/types"
import { AppBar, Box, Button, IconButton, MenuItem, TextField, Toolbar, Typography } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { createModule } from "../app/modulesSlice"

interface ModuleFormInput {
	title: string
	description: string
	courseId: string
}

const CreateModuleForm = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const {courses} = useAppSelector(state => state.course)

	const {control, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			title: '',
			description: '',
			courseId: '',
		}
	})

	const onSubmit: SubmitHandler<ModuleFormInput> = async (data) => {
		const module: Module = {
			title: data.title,
			description: data.description,
			courseId: data.courseId,
		}

		const resp = await dispatch(createModule(module))
		
		if (resp) navigate('/?addedCourse=false')
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
					<Typography variant="h4">Создать модуль</Typography>
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
							id="module-title"
							label="Название модуля"
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
							id="module-desc"
							label="Описание модуля"
							multiline
							rows={4}
							sx={{width: '500px'}}
						/>
					)}
				/>

				<Controller
					name="courseId"
					control={control}
					rules={{
						required: 'Выберите курс'
					}}
					render={({
						field: {onChange, value},
					}) => (
						<TextField
							select
							helperText={errors.courseId ? errors.courseId.message : null}
							error={!!errors.courseId}
							onChange={onChange}
							value={value}
							required
							id="module-course"
							label="Курс"
							sx={{width: '500px'}}
						>
							{courses && courses.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.title}
								</MenuItem>
							))
							}
						</TextField>
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

export default CreateModuleForm
