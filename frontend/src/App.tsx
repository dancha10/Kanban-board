import React, { useMemo } from 'react'
import { ToastContainer } from 'react-toastify'

import PopupStore from './store/PopupStor'

import { useRouter } from './hooks/router.hook'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './utils/context/AuthContext'
import { StoreContext } from './utils/context/StoreContext'

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

	const StoreProps = useMemo(() => {
		return { PopupStore }
	}, [])

	if (!isReady) return <Loader />

	return (
		<AuthContext.Provider value={ProviderProps}>
			<StoreContext.Provider value={StoreProps}>
				{Router}
				<ToastContainer />
			</StoreContext.Provider>
		</AuthContext.Provider>
	)
}
