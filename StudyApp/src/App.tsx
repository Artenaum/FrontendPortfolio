import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import CoursePage from './pages/CoursePage'
import CreateCourseForm from './pages/CreateCourseForm'
import CreateModuleForm from './pages/CreateModuleForm'


function App() {
  return (
    <>
      <Routes>
		<Route path="/" element={<MainPage/>}/>
		<Route path="/:courseId" element={<CoursePage/>}/>
		<Route path="/createCourse" element={<CreateCourseForm/>}/>
		<Route path="/createModule" element={<CreateModuleForm/>}/>
	  </Routes>
    </>
  )
}

export default App
