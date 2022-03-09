import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import {
	$errorMessage,
	$successMessage,
	successMessageCleared,
} from 'entities/notification-handler/model'
import { useNotification } from 'shared/lib/hooks'

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
	}, [])
	return null
}
