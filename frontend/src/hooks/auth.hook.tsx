import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SCREENS } from '../routes/endpoints'

const storageName = 'Token'

export const useAuth = () => {
	const navigate = useNavigate()
	const [token, setToken] = useState<string>('')
	const [isReady, setReady] = useState(false)

	const login = useCallback((jwtToken: string) => {
		setToken(jwtToken)
		localStorage.setItem(storageName, jwtToken)
	}, [])

	const logout = useCallback(() => {
		setToken('')
		localStorage.removeItem(storageName)
		navigate(SCREENS.SCREENS__MAIN)
	}, [])

	const refresh = useCallback(async () => {
		try {
			const req: Response = await fetch('/api/auth/refresh')
			const data = await req.json()
			if (req.status === 200 && data.accessToken) {
				localStorage.setItem(storageName, data.accessToken)
				return data
			}
			logout()
			throw data
		} catch (e) {
			console.log('throw')
			throw new Error(`RefreshToken ${e}`)
		}
	}, [])

	useEffect(() => {
		if (localStorage.getItem(storageName)) {
			;(async function isAuth() {
				await refresh()
				console.log('useEffect')
				login(localStorage.getItem(storageName)!)
			})()
		}
		setReady(true)
	}, [login, refresh])

	return { login, logout, isReady, refresh, token }
}
