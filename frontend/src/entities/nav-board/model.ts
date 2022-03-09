import { createGate } from 'effector-react'
import { createEffect, createStore, sample } from 'effector'
import { AxiosError } from 'axios'

import { getAllBoard } from 'shared/api'
import { IBoardShortInfo } from 'shared/lib'

const boardMock: IBoardShortInfo[] = [
	{
		_id: '',
		BID: '',
		title: '',
		background: 'blue',
	},
]

export const MainPageGate = createGate()

const getAllBoardsFx = createEffect<void, Array<IBoardShortInfo>, AxiosError>(
	async () => await getAllBoard()
)

export const $boards = createStore<Array<IBoardShortInfo>>(boardMock).on(
	getAllBoardsFx.doneData,
	(_, boards) => boards
)

sample({
	clock: MainPageGate.open,
	target: getAllBoardsFx,
})
