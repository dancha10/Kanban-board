import { createEffect, createStore, sample } from 'effector'
import { persist } from 'effector-storage/session'

import { STORAGE_NAME } from 'shared/config'

export const $accessToken = createStore<string>('')

export const localStorageFx = createEffect<string, void, Error>(token => {
	localStorage.setItem(STORAGE_NAME, token)
})

sample({
	clock: $accessToken,
	target: localStorageFx,
})

export const clearLocalStorageFx = createEffect<void, void, Error>(() =>
	localStorage.removeItem(STORAGE_NAME)
)

sample({
	clock: clearLocalStorageFx,
	fn: () => '',
	target: $accessToken,
})

export const $isAuthenticated = $accessToken.map(token => !!token)

// -------------------------- Session Storage ------------------------- //

export const $sessionStorage = createStore('')

export const sessionStorageFx = createEffect<string, void, Error>(id => {
	sessionStorage.setItem('cardID', id)
})

$sessionStorage.watch(el => console.log('sess storage:', el))

sample({
	clock: $sessionStorage,
	target: sessionStorageFx,
})
// persist({ store: $sessionStorage, key: 'cardID' })
