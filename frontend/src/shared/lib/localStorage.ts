import { createEffect, createStore, sample } from 'effector'

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
