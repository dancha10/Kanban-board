import { createEffect, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { getAllBoard } from '../http/API/board.api'
import { IBoardShortInfo } from '../utils/types/board.type'

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
