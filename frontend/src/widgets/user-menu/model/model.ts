import { createEvent, createStore } from 'effector'

export const changedOpening = createEvent<boolean>()
export const $isOpen = createStore(false).on(changedOpening, (_, open) => open)
