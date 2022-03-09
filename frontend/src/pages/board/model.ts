import { createEffect, createEvent, createStore, sample } from 'effector'
import { AxiosError } from 'axios'

import { getCurrentBoardById } from 'shared/api'
import { IBoard } from 'shared/lib'

const currentBoardMock: IBoard = {
	_id: '',
	BID: '',
	title: '',
	owner: '',
	background: 'blue',
	users: [],
	columns: [],
}

export const urlRedirected = createEvent<string>()

export const getCurrentBoardFx = createEffect<string, IBoard, AxiosError>(async (id: string) =>
	getCurrentBoardById(id)
)

sample({
	clock: urlRedirected,
	target: getCurrentBoardFx,
})

export const $currentBoard = createStore<IBoard>(currentBoardMock).on(
	getCurrentBoardFx.doneData,
	(_, board) => board
)
