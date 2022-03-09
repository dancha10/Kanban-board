import { createEffect, createEvent, sample } from 'effector'
import { AxiosError } from 'axios'

import { logout } from 'shared/api'
import { clearLocalStorageFx } from 'shared/lib'

export const logoutClicked = createEvent()

const logoutFx = createEffect<void, void, AxiosError>(async () => await logout())

sample({
	clock: logoutClicked,
	target: logoutFx,
})

sample({
	clock: logoutFx.doneData,
	target: clearLocalStorageFx,
})
