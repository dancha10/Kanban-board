import { createEffect, createEvent, createStore, sample } from 'effector'
import { AxiosError } from 'axios'

import { changeColumnTitle } from 'shared/api'

type changeTitleColumnType = {
	columnID: string
	title: string
}

export const titleEdited = createEvent<string>()
export const $titleColumn = createStore('').on(titleEdited, (_, value) => value)

const saveTitleFx = createEffect<changeTitleColumnType, string, AxiosError>(
	async ({ columnID, title }) => await changeColumnTitle(columnID, title)
)

export const titleSaved = createEvent<string>()

sample({
	clock: titleSaved,
	source: $titleColumn,
	fn: (title, id) => {
		return { title, columnID: id }
	},
	target: saveTitleFx,
})
