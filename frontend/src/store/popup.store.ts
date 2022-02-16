import { createEvent, createStore, forward } from 'effector'

const userMenuActivatorClicked = createEvent<boolean>()
const $isUserMenuActive = createStore(false)

forward({
	from: userMenuActivatorClicked,
	to: $isUserMenuActive,
})

const boardMenuActivatorClicked = createEvent<boolean>()
const $isBoardMenuActive = createStore(false)

forward({
	from: boardMenuActivatorClicked,
	to: $isBoardMenuActive,
})

const modalTaskActivatorClicked = createEvent<boolean>()
const $isModalTaskActive = createStore(false)

forward({
	from: modalTaskActivatorClicked,
	to: $isModalTaskActive,
})

export {
	userMenuActivatorClicked,
	$isUserMenuActive,
	boardMenuActivatorClicked,
	$isBoardMenuActive,
	modalTaskActivatorClicked,
	$isModalTaskActive,
}
