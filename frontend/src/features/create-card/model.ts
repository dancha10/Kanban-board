import { createEffect, createEvent, createStore, sample } from 'effector'
import { AxiosError } from 'axios'

import { createCard } from 'shared/api'
import { $sessionStorage } from 'shared/lib'

export const changedActivation = createEvent()
export const $isActive = createStore(false).on(changedActivation, (active, _) => !active)

export const createdCard = createEvent<string>()
const createCardFx = createEffect<string, string, AxiosError>(
	async (columnID: string) => await createCard(columnID)
)

sample({
	clock: createdCard,
	target: createCardFx,
})

export const $currentCardID = createStore('').on(createCardFx.doneData, (_, id) => id)

sample({
	clock: $currentCardID,
	target: $sessionStorage,
})
