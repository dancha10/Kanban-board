// eslint-disable-next-line import/no-extraneous-dependencies
import { createEffect, createEvent, createStore, forward, sample } from 'effector'
import { createGate } from 'effector-react'
import { getAllBoard, getCurrentBoardById } from '../http/API/board.api'
import { IBoard, IBoardShortInfo } from '../utils/types/board.type'

// --------------------- get all boards for NavBar ----------------------- //

export const NavBarGate = createGate()
const getAllMainInfoFx = createEffect<void, Array<IBoardShortInfo> | undefined, Error>(
	async () => await getAllBoard()
)
const $boardsMainInfo = createStore<Array<IBoardShortInfo> | undefined>([]).on(
	getAllMainInfoFx.doneData,
	(_, posts) => posts
)

sample({
	clock: NavBarGate.open,
	target: getAllMainInfoFx,
})

export { $boardsMainInfo, getAllMainInfoFx }

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
const sentBoardId = createEvent<string>()
const getCurrentBoardByIdFx = createEffect(async (id: string) => await getCurrentBoardById(id))

const $currentBoard = createStore<IBoard | undefined>(mochaDataBoard).on(
	getCurrentBoardByIdFx.doneData,
	(_, currentBoard) => currentBoard
)

forward({
	from: sentBoardId,
	to: getCurrentBoardByIdFx,
})

export { $currentBoard, sentBoardId, getCurrentBoardByIdFx }
