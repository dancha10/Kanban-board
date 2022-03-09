import { createEvent, createStore } from 'effector'

export const changedActivation = createEvent()
export const $isActive = createStore(false).on(changedActivation, (active, _) => !active)
