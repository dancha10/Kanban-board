import { makeAutoObservable } from 'mobx'

class PopupStore {
	_isUserMenuActive = false

	_isBoardMenuActive = false

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	setActiveUserMenu(bool: boolean) {
		this._isUserMenuActive = bool
	}

	get isUserMenuActive() {
		return this._isUserMenuActive
	}

	setActiveBoardMenu(state: boolean) {
		this._isBoardMenuActive = state
	}

	get isBoardMenuActive() {
		return this._isBoardMenuActive
	}
}

export default new PopupStore()
