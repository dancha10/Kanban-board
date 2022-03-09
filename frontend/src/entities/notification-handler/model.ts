import { createEvent, createStore, sample } from 'effector'
import { AxiosError } from 'axios'

// ------------------ Error Handler ------------------- //

const clearError = createEvent()

export const $errorHandler = createStore<AxiosError>({
	config: {},
	isAxiosError: false,
	name: '',
	response: undefined,
	stack: '',
	message: '',
	toJSON: () => {
		return {}
	},
})

export const $errorMessage = createStore<string>('').reset(clearError)

sample({
	clock: $errorHandler,
	fn: error => error?.response?.data?.message,
	target: $errorMessage,
})

sample({
	clock: $errorMessage,
	target: clearError,
})

// ----------------- Success Handler ---------------------- //

export const successMessageCleared = createEvent()
export const $successMessage = createStore<string>('').reset(successMessageCleared)
