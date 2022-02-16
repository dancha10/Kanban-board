import { createEvent, createStore } from 'effector'

const userMenuActivate = createEvent()
const userMenuInactivate = createEvent()
const $isUserMenu = createStore(false)
	.on(userMenuActivate, (_, active) => active)
	.reset(userMenuInactivate)

const boardMenuActive = createEvent()
const boardMenuInactive = createEvent()
const $isBoardMenuActive = createStore(false)
	.on(boardMenuActive, (_, active) => active)
	.reset(boardMenuInactive)

const modalTaskActive = createEvent()
const modalTaskInactive = createEvent()
const $isModalTaskActive = createStore(false)
	.on(boardMenuActive, (_, active) => active)
	.reset(modalTaskActive)

export {
	userMenuActivate,
	userMenuInactivate,
	$isUserMenu,
	boardMenuActive,
	boardMenuInactive,
	$isBoardMenuActive,
	modalTaskActive,
	modalTaskInactive,
	$isModalTaskActive,
}
