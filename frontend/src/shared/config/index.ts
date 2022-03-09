const getEnvVar = (key: string) => {
	if (process.env[key] === undefined) {
		throw new Error(`Env variable ${key} is required`)
	}
	return process.env[key] || ''
}

export const API_URL = getEnvVar('REACT_APP_API_BASE_URL')
export const STORAGE_NAME = getEnvVar('REACT_APP_LOCALSTORAGE_NAME')
