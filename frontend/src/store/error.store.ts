import { createDomain } from 'effector'

const errorDomain = createDomain()

export const clearError = errorDomain.createEvent()

export const $error = errorDomain.createStore<string | undefined>('').reset(clearError)
