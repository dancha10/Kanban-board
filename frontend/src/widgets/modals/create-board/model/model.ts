import { createEffect, createEvent, createStore, sample } from 'effector'
import { AxiosError } from 'axios'

import { boardCreate } from 'shared/api'
import { $errorHandler } from 'entities/notification-handler'

export const changedNewTitle = createEvent<string>()
export const $titleNewBoardValue = createStore<string>('').on(changedNewTitle, (_, title) => title)

export const createNewBoard = createEvent()
const createNewBoardFx = createEffect<string, string, AxiosError>(
	async (title: string) => await boardCreate(title)
)

sample({
	clock: createNewBoard,
	source: $titleNewBoardValue,
	target: createNewBoardFx,
})

sample({
	clock: createNewBoardFx.failData,
	target: $errorHandler,
})
