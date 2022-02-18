import { createEffect, createEvent, createStore, forward, sample } from 'effector'
import { createGate } from 'effector-react'
import { AxiosError } from 'axios'
import { boardCreate, getAllBoard, getCurrentBoardById } from '../http/API/board.api'
import { IBoard, IBoardShortInfo } from '../utils/types/board.type'
import { $error } from './error.store'
import { $successMessages } from './success.store'

// --------------------- get current board by id  ----------------------- //

const mochaDataBoard = {
	_id: '',
	BID: '',
	title: '',
	background: '',
	owner: '',
	users: [],
	columns: [],
}
// TODO WebSockets
export const sentBoardId = createEvent<string>()
export const getCurrentBoardByIdFx = createEffect<string, IBoard, AxiosError>(
	async (id: string) => await getCurrentBoardById(id)
)

export const $currentBoard = createStore<IBoard>(mochaDataBoard).on(
	getCurrentBoardByIdFx.doneData,
	(_, currentBoard) => currentBoard
)

forward({
	from: sentBoardId,
	to: getCurrentBoardByIdFx,
})

// --------------------- create new board  ----------------------- //

export const createBoardClicked = createEvent<string>()
export const createBoardFx = createEffect<string, string, AxiosError>(
	async (title: string) => await boardCreate(title)
)

forward({
	from: createBoardClicked,
	to: createBoardFx,
})

// --------------------- get all boards for NavBar ----------------------- //

export const NavBarGate = createGate()
export const getAllMainInfoFx = createEffect<void, Array<IBoardShortInfo>, AxiosError>(
	async () => await getAllBoard()
)
export const $boardsMainInfo = createStore<Array<IBoardShortInfo>>([]).on(
	getAllMainInfoFx.doneData,
	(_, posts) => posts
)

$boardsMainInfo.watch(el => console.log(el))

sample({
	clock: [NavBarGate.open, createBoardFx.doneData],
	target: getAllMainInfoFx,
})

// ------------------- Error Handler ---------------------------- //

sample({
	clock: [createBoardFx.failData, getCurrentBoardByIdFx.failData, getAllMainInfoFx.failData],
	fn: error => error?.response?.data?.message,
	target: $error,
})

// --------------------- Success messages ------------------------- //

sample({
	clock: [createBoardFx.doneData],
	target: $successMessages,
})
