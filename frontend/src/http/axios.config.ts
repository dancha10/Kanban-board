import axios from 'axios'
import { IAccessToken } from '../utils/types/auth.type'

export const BASE_URL = 'http://localhost:5000/api'
export const storageName = 'Token'

export const $api = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
})

export const $auth = axios.create({
	withCredentials: true,
	baseURL: `${BASE_URL}/auth`,
})

$api.interceptors.request.use(config => {
	config.headers!.Authorization = `Bearer ${localStorage.getItem(storageName)}`
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
				const refresh = await axios.get<IAccessToken>(`${BASE_URL}/auth/refresh`, {
					withCredentials: true,
				})
				localStorage.setItem(storageName, refresh.data.accessToken)
				return $api.request(originalRequest)
			} catch (e) {
				return false
			}
		}
	}
)
