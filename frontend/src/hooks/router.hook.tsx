import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { SignUpPage } from '../pages/SignUpPage'
import { BoardPage } from '../pages/BoardPage'

import { SCREENS } from '../routes/endpoints'

type RouterHook = (isAuthenticated: boolean) => {}

export const useRouter: RouterHook = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<BrowserRouter>
				<Routes>
					<Route path={SCREENS.SCREENS__MAIN} element={<BoardPage />} />

					{/* <Route path='*' element={<div>Redirect</div>} /> */}
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
