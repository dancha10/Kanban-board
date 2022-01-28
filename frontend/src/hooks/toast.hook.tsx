import React, { useCallback } from 'react'
import { toast } from 'react-toastify'

export const useToasty = () => {
	return useCallback((message: string, type: 'success' | 'error' | undefined = 'error') => {
		if (type === 'success') {
			return toast.success(message, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
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
