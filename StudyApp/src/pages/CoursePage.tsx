import { AppBar, Box, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import {ArrowBack} from "@mui/icons-material"
import { useEffect, useState } from "react"
import type { Course, Module } from "../types/types"
import { useNavigate, useParams } from "react-router"
import { useAppSelector } from "../app/store"

const CoursePage = () => {
	const navigate = useNavigate()
	const params = useParams()

	const [course, setCourse] = useState({} as Course)
	const [filteredModules, setFilteredModules] = useState([{} as Module])

	const courseState = useAppSelector(state => state.course)
	const courses = courseState.courses
	const coursesStatus = courseState.status
	const coursesError = courseState.error

	const moduleState = useAppSelector(state => state.module)
	const modules = moduleState.modules
	const modulesStatus = moduleState.status
	const modulesError = moduleState.error

	useEffect(() => {
		const getCourse = () => {
			let a = courseState.courses.find((item) => item.id === params.courseId)
			console.log('course a:', a)
			let x = a || {} as Course
			console.log('course x:', x)
			setCourse(x)
		}

		const getCourseModules = () => {
			let a = moduleState.modules.filter((item) => String(item.courseId) === params.courseId)
			console.log('module a:', a)
			let x = a || [] as Module[]
			console.log('module x:', x)
			setFilteredModules(x)
		}

		if (courses) getCourse()
		if (modules) getCourseModules()
	}, [courses, modules])

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
					{course.title &&
						<Typography variant="h4">{course.title}</Typography>
					}
					{coursesError && <Typography>{coursesError}</Typography>}
					<Box sx={{marginLeft: 'auto'}}/>
				</Toolbar>
			</AppBar>

			<Box sx={{
				width: '100%',
				height: '100px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				{course.description &&
					<Typography variant="h6">{course.description}</Typography>
				}
			</Box>

			<List component='div' sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '10px',
			}}>
				{filteredModules && 
					filteredModules.map((module) => (
						<ListItem key={module.id}
							sx={{
								height: '80px',
								width: '80%',
								backgroundColor: '#dededeff'
							}}
						>
							<ListItemText primary={module.title} secondary={module.description}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center'
							}} slotProps={{primary: {fontSize: '20px'}}}></ListItemText>
						</ListItem>
					))
				}
			</List>
		</>
	)
}

export default CoursePage
