import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useGate, useStore } from 'effector-react'

import { AppGate } from 'processes/auth'
import { $isAuthenticated, SCREENS } from 'shared/lib'
import { ChooseMessage } from 'shared/ui/choose-message'

const BoardPage = lazy(() => import('pages/board'))
const SignInPage = lazy(() => import('pages/auth/sign-in'))
const SignUpPage = lazy(() => import('pages/auth/sign-up'))
const TemplateLayout = lazy(() => import('pages/template/ui'))

export const Router: React.FC = () => {
	useGate(AppGate)
	const isAuthenticated = useStore($isAuthenticated)
	if (isAuthenticated)
		return (
			<Routes>
				<Route path={SCREENS.SCREENS__MAIN} element={<TemplateLayout />}>
					<Route index element={<ChooseMessage />} />
					<Route path={`${SCREENS.SCREENS__MAIN}/b/:id`} element={<BoardPage />} />
					<Route path={SCREENS.SCREENS__REDIRECT} element={<BoardPage />} />
				</Route>
				<Route
					path={SCREENS.OAUTH__REDIRECT}
					element={<div>You have successfully logged in</div>}
				/>
			</Routes>
		)
	return (
		<Routes>
			<Route path={SCREENS.SCREENS__LOGIN} element={<SignInPage />} />
			<Route path={SCREENS.SCREENS__REGISTRATION} element={<SignUpPage />} />
			<Route
				path={SCREENS.OAUTH__REDIRECT}
				element={<div>You have successfully logged in</div>}
			/>
			<Route path={SCREENS.SCREENS__REDIRECT} element={<SignInPage />} />
		</Routes>
	)
}
