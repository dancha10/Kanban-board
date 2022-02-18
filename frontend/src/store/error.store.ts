import { createDomain } from 'effector'

const errorDomain = createDomain()

export const clearedError = errorDomain.createEvent()

export const $error = errorDomain.createStore<string | undefined>('').reset(clearedError)
