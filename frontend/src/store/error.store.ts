import { createEvent, createStore } from 'effector'

export const clearError = createEvent()

export const $error = createStore<string | undefined>('').reset(clearError)
