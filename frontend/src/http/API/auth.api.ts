import { $auth } from '../axios.config'
import { IAccessToken } from '../../utils/types/auth.type'

export const login = async (email: string, password: string): Promise<string> => {
	const response = await $auth.post<IAccessToken>('/login', { email, password })
	return response.data.accessToken
}

export const registration = async (
	email: string,
	password: string,
	passwordConfirm: string,
	nickname: string
): Promise<string> => {
	const response = await $auth.post<IAccessToken>('/signup', {
		email,
		password,
		password_confirm: passwordConfirm,
		nickname,
	})
	return response.data.accessToken
}

export const logout = async () => await $auth.get('/logout')

export const refreshToken = async (): Promise<string> => {
	const response = await $auth.get<IAccessToken>('/refresh')
	return response.data.accessToken
}
