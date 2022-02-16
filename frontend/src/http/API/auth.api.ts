import axios from 'axios'
import { $api, BASE_URL } from '../axios.config'
import { addError } from '../../store/Error/error.store'
import { IAccessToken } from '../../utils/types/Auth.types'

export const login = async (email: string, password: string): Promise<string | undefined> => {
	try {
		const response = await $api.post<IAccessToken>('/auth/login', { email, password })
		return response.data.accessToken
	} catch (e: any) {
		addError(e.response.data.message)
	}
}

export const registration = async (
	email: string,
	password: string,
	passwordConfirm: string,
	nickname: string
): Promise<string | undefined> => {
	try {
		const response = await $api.post<IAccessToken>('/auth/signup', {
			email,
			password,
			password_confirm: passwordConfirm,
			nickname,
		})
		return response.data.accessToken
	} catch (e: any) {
		addError(e.response.data.message)
	}
}

export const logout = async () => {
	try {
		return await $api.get('/auth/logout')
	} catch (e: any) {
		addError(e.response.data.message)
	}
}

export const refreshToken = async (): Promise<string | undefined> => {
	try {
		const response = await axios.get<IAccessToken>(`${BASE_URL}/auth/refresh`, {
			withCredentials: true,
		})
		return response.data.accessToken
	} catch (e: any) {
		addError(e.response.data.message)
	}
}
