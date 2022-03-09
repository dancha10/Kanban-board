import { createEffect, createEvent, createStore, sample } from 'effector'
import { AxiosError } from 'axios'

import { createColumn } from 'shared/api'
import { getBIDfromPathUrl } from 'shared/lib/getters'
import { $errorHandler } from 'entities/notification-handler'

export const createdColumnTitle = createEvent<string>()
const $columnTitleValue = createStore('').on(createdColumnTitle, (_, title) => title)

const createColumnTitleFx = createEffect<string, string, AxiosError>(
	async (title: string) => await createColumn(getBIDfromPathUrl(), title)
)

export const submittedCreateColumn = createEvent()

sample({
	clock: submittedCreateColumn,
	source: $columnTitleValue,
	target: createColumnTitleFx,
})

sample({
	clock: createColumnTitleFx.failData,
	target: $errorHandler,
})
