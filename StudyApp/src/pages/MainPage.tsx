import { Alert, AppBar, Button, List, ListItemButton, ListItemText, Snackbar, Toolbar, Typography, type SnackbarCloseReason } from "@mui/material"
import { useEffect, useState } from "react"
import type { Course } from "../types/types"
import { useNavigate, useSearchParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../app/store"
import { fetchCourses } from "../app/coursesSlice"
import { fetchModules } from "../app/modulesSlice"

const MainPage = () => {
	const navigate = useNavigate()
	let [searchParams] = useSearchParams()
	const [open, setOpen] = useState(false)
	const {courses, status, error} = useAppSelector(state => state.course)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchCourses())
		dispatch(fetchModules())

		console.log(searchParams)
		if (searchParams.size !== 0) setOpen(true)
	}, [])

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason,
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false)
	}

	return (
		<>
			<AppBar position="static">
				<Toolbar sx={{alignItems: 'center'}}>
					<Typography variant="h4" sx={{flexGrow: 1}}>КУРСЫ</Typography>

					<Button variant="contained" color="info" 
						sx={{marginRight: '20px'}}
						onClick={() => navigate('/createCourse')}
					>Создать курс</Button>
					<Button variant="contained" color="info" 
						onClick={() => navigate('/createModule')}
					>Создать модуль</Button>
				</Toolbar>
			</AppBar>

			<List component='div' sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '10px',
				marginTop: '20px'
			}}>
				{courses && 
					courses.map((course) => (
						<ListItemButton key={course.id}
							sx={{
								height: '50px',
								width: '80%',
								backgroundColor: '#dededeff'
							}}
							onClick={() => navigate(`/${course.id}`)}
						>
							<ListItemText primary={course.title} sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}} slotProps={{primary: {fontSize: '20px'}}}></ListItemText>
						</ListItemButton>
					))
				}
			</List>
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
			>
				<Alert severity="success" onClose={handleClose} variant="filled">
					{searchParams.get('addedCourse') === 'true' 
					? 'Добавлен новый курс' 
					: 'Добавлен новый модуль'}
				</Alert>
			</Snackbar>
		</>
	)
}

export default MainPage
