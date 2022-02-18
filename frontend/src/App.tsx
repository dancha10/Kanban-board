import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Router } from './routes/routes'
import { Loader } from './components/atoms/Loader'

import { useNotification } from './hooks/notification.hook'

import { $accessToken, checkAuthorization, refreshFx } from './store/auth.store'
import { storageName } from './http/axios.config'
import { $error, clearedError } from './store/error.store'
import { $successMessages, successMessageCleared } from './store/success.store'

export function App() {
	useEffect(() => {
		if (localStorage.getItem(storageName)) {
			checkAuthorization()
		}
	}, [])

	const isLoading = useStore(refreshFx.pending)
	const isAuthenticated = !!useStore($accessToken)

	const successMessage = useStore($successMessages)
	const errorMessage = useStore($error)
	const toastNotification = useNotification()

	useEffect(() => {
		if (errorMessage) {
			toastNotification(errorMessage)
		}
		clearedError()

		toastNotification(successMessage, 'success')
		successMessageCleared()
	}, [errorMessage, clearedError, successMessage, successMessageCleared])

	if (isLoading) return <Loader isFull />

	return (
		<>
			<Router isAuthenticated={isAuthenticated} />
			<ToastContainer />
		</>
	)
}
