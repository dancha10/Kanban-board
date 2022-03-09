import React from 'react'
import { ToastContainer } from 'react-toastify'

import { withProviders } from 'app/providers'
import { Router } from 'pages'
import { NotificationHandler } from 'entities/notification-handler'

import './styles/main.scss'

const App = () => {
	return (
		<>
			<Router />
			<ToastContainer />
			<NotificationHandler />
		</>
	)
}

export default withProviders(App)
