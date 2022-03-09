import React, { useCallback } from 'react'
import { toast } from 'react-toastify'

export const useNotification = () => {
	return useCallback((message: string, type: 'success' | 'error' | undefined = 'error') => {
		if (type === 'success') {
			return toast.success(message, {
				position: 'bottom-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			})
		}
		toast.error(message, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
	}, [])
}
