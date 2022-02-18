import { createEffect, createEvent, createStore, forward } from 'effector'
import { changeColumnTitle } from '../http/API/column.api'

type changeTitlePayload = {
	columnID: string
	title: string
}

const changedTitleBlur = createEvent<changeTitlePayload>()

const changeTitleFx = createEffect<changeTitlePayload, string, Error>(
	async ({ columnID, title }) => await changeColumnTitle(columnID, title)
)

changedTitleBlur.watch(el => console.log(el))

forward({
	from: changedTitleBlur,
	to: changeTitleFx,
})

export { changedTitleBlur, changeTitleFx }
