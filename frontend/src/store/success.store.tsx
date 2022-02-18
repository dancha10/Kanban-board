import { createDomain } from 'effector'

const successDomain = createDomain()

export const successMessageCleared = successDomain.createEvent()
export const $successMessages = successDomain.createStore('').reset(successMessageCleared)
