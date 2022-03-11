import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import { useNotification } from 'shared/lib/hooks'

import { $errorMessage, $successMessage, successMessageCleared } from './model'

export const NotificationHandler: React.FC = () => {
	const notify = useNotification()
	const errorMessage = useStore($errorMessage)
	const successMessage = useStore($successMessage)

	useEffect(() => {
		if (errorMessage) notify(errorMessage)
	}, [errorMessage])

	useEffect(() => {
		if (successMessage) {
			notify(successMessage, 'success')
			successMessageCleared()
		}
	}, [successMessage])
	return null
}
