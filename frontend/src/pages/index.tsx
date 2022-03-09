import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useGate, useStore } from 'effector-react'

import { AppGate } from 'processes/auth'
import { $isAuthenticated, SCREENS } from 'shared/lib'
import { ChooseMessage } from 'shared/ui/choose-message'
import { Template } from 'widgets/template'

const BoardPage = lazy(() => import('./board'))
const SignInPage = lazy(() => import('pages/auth/sign-in'))
const SignUpPage = lazy(() => import('pages/auth/sign-up'))

export const Router: React.FC = () => {
	useGate(AppGate)
	const isAuthenticated = useStore($isAuthenticated)
	if (isAuthenticated)
		return (
			<Routes>
				<Route path={SCREENS.SCREENS__MAIN} element={<Template />}>
					<Route index element={<ChooseMessage />} />
					<Route path={`${SCREENS.SCREENS__MAIN}/b/:id`} element={<BoardPage />} />
					<Route path={SCREENS.SCREENS__REDIRECT} element={<BoardPage />} />
				</Route>
			</Routes>
		)
	return (
		<Routes>
			<Route path={SCREENS.SCREENS__LOGIN} element={<SignInPage />} />
			<Route path={SCREENS.SCREENS__REGISTRATION} element={<SignUpPage />} />
			<Route path={SCREENS.SCREENS__REDIRECT} element={<SignInPage />} />
		</Routes>
	)
}
