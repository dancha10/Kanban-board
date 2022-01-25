import React, { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../utils/context/AuthContext'

type RequestHook = () => {
	isLoading: boolean
	request: () => Promise<any>
	error: string | null
	clearError: () => void
}

type retryFetchType = (
	url: string,
	method?: string,
	body?: BodyInit | null | undefined,
	headers?: HeadersInit | undefined
) => Promise<any>

const refetch: retryFetchType = async (url, method, body, headers) => {
	try {
		const req = await fetch(url, { method, body, headers })
		return await req.json()
	} catch (e) {
		throw new Error(`Refetch ${e}`)
	}
}

export const useRequest = () => {
	const [isLoading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const auth = useContext(AuthContext)

	const request = useCallback(
		async (url, method = 'GET', body = null, headers = {}, isAuthorization = false) => {
			try {
				setLoading(true)

				if (body) {
					body = JSON.stringify(body)
					headers['Content-Type'] = 'application/json'
				}

				if (isAuthorization && localStorage.getItem('Token')) {
					console.log('isAuth')
					headers.Authorization = `Bearer ${localStorage.getItem('Token')}`
				}

				const response = await fetch(url, { method, body, headers })
				const data = await response.json()

				if (!response.ok && response.status === 401) {
					const refreshToken: any = await auth.refresh() // TODO add TYPE
					headers.Authorization = `Bearer ${refreshToken.accessToken}`
					return await refetch(url, method, body, headers)
				}

				if (!response.ok) {
					console.log(response)
					throw new Error(data.message || 'useRequest: Error')
				}

				return data
			} catch (err) {
				let errorMessage = 'Failed'
				if (err instanceof Error) errorMessage = err.message
				setError(errorMessage)

				throw err
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	const clearError = useCallback(() => setError(null), [])

	return { isLoading, request, error, clearError }
}
