import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Router } from './routes/routes'
import { Loader } from './components/atoms/Loader'

import { $accessToken, checkAuthorization, refreshFx } from './store/auth.store'
import { storageName } from './http/axios.config'

export function App() {
	useEffect(() => {
		if (localStorage.getItem(storageName)) {
			checkAuthorization()
		}
	}, [])

	const isLoading = useStore(refreshFx.pending)
	const isAuthenticated = !!useStore($accessToken)

	if (isLoading) return <Loader isFull />

	return (
		<>
			<Router isAuthenticated={isAuthenticated} />
			<ToastContainer />
		</>
	)
}
