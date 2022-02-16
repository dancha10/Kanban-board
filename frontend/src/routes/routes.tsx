import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '../components/template/Layout'
import { AuthPage } from '../pages/AuthPage'
import { SignUpPage } from '../pages/SignUpPage'
import { MainPage } from '../pages/MainPage'
import { BoardPage } from '../pages/BoardPage'

import { SCREENS } from './endpoints'

interface IRoutes {
	isAuthenticated: boolean
}

export const Router: React.FC<IRoutes> = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return (
			<BrowserRouter>
				<Routes>
					<Route path={SCREENS.SCREENS__MAIN} element={<Layout />}>
						<Route index element={<MainPage />} />
						<Route path={`${SCREENS.SCREENS__MAIN}/b/:id`} element={<BoardPage />} />

						<Route path='*' element={<MainPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		)
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path={SCREENS.SCREENS__LOGIN} element={<AuthPage />} />
				<Route path={SCREENS.SCREENS__REGISTRATION} element={<SignUpPage />} />

				<Route path='*' element={<AuthPage />} />
			</Routes>
		</BrowserRouter>
	)
}
