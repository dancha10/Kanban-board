import React, { useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useRouter } from './hooks/router.hook'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './utils/context/AuthContext'

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

	if (!isReady) {
		console.log('loader')
		return <div style={{ height: '100vh', background: 'red' }}>Loader...</div>
	}

	return (
		<AuthContext.Provider value={ProviderProps}>
			{Router}
			<ToastContainer />
		</AuthContext.Provider>
	)
}
