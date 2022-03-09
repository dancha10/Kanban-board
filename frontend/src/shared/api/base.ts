import axios from 'axios'

import { API_URL, STORAGE_NAME } from 'shared/config'
import { IAccessToken } from 'shared/lib'

export const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

export const $auth = axios.create({
	withCredentials: true,
	baseURL: `${API_URL}/auth`,
})

// ----------- Interceptors -------------------------- //

$api.interceptors.request.use(config => {
	config.headers!.Authorization = `Bearer ${localStorage.getItem(STORAGE_NAME)}`
	return config
})

$api.interceptors.response.use(
	config => {
		return config
	},
	async err => {
		const originalRequest = err.config
		if (err.response.status === 401 && err.config && !err.config._isRetry) {
			originalRequest._isRetry = true
			try {
				const refresh = await axios.get<IAccessToken>(`${API_URL}/auth/refresh`, {
					withCredentials: true,
				})
				localStorage.setItem(STORAGE_NAME, refresh.data.accessToken)
				return $api.request(originalRequest)
			} catch (e) {
				return false
			}
		}
	}
)
