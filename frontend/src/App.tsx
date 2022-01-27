import React, { useMemo } from 'react'
import { ToastContainer } from 'react-toastify'

import { useRouter } from './hooks/router.hook'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './utils/context/AuthContext'

import { Loader } from './components/atoms/Loader'

import 'react-toastify/dist/ReactToastify.css'

export function App() {
	const { login, logout, isReady, refresh, token } = useAuth()
	const isAuthenticated = !!token
	const Router = useRouter(isAuthenticated)

	const ProviderProps = useMemo(() => {
		return {
			token,
			login,
			logout,
			refresh,
			isAuthenticated,
		}
	}, [])

	if (!isReady) return <Loader />

	return (
		<AuthContext.Provider value={ProviderProps}>
			{Router}
			<ToastContainer />
		</AuthContext.Provider>
	)
}
