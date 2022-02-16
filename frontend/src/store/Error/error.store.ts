import { createEvent, createStore } from 'effector'

const addError = createEvent<string>()
const clearError = createEvent()

const $ErrorStore = createStore<string | null>(null)
	.on(addError, (_, err) => err)
	.reset(clearError)

export { $ErrorStore, addError, clearError }
