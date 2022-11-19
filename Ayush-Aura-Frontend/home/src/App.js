import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Search from './Pages/Search/searchAPI';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/LogIn'
import Signup from './Pages/Signup/SignUp'
import DoctorPage from './Pages/Doctor/Doctor'

const App = () => {
	return (
	<BrowserRouter>
		<Routes>
			<Route exact path = '/' element = {<Home/>}></Route>
			<Route path='/search' element = {<Search />}></Route>
			<Route path='/login' element = {<Login />}></Route>
			<Route path='/signup' element = {<Signup />}></Route>
			<Route path='/doctor' element = {<DoctorPage />}></Route>
		</Routes>
	</BrowserRouter>
	)
}

export default App;