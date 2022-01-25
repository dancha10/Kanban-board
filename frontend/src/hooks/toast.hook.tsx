import React, { useCallback } from 'react'
import { toast } from 'react-toastify'

export const useToasty = () => {
	return useCallback((message: string) => {
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
