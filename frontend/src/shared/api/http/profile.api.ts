import { IUserInfo } from 'shared/lib'
import { $api } from 'shared/api/base'

const API_TAG = '/profile'

export const getUserInfo = async (): Promise<IUserInfo> => {
	const response = await $api.get<IUserInfo>(`${API_TAG}/me`)
	return response.data
}
