import { createGate } from 'effector-react'
import { createEffect, guard, sample } from 'effector'
import { AxiosError } from 'axios'

import { refreshToken } from 'shared/api'
import { $accessToken } from 'shared/lib'
import { STORAGE_NAME } from 'shared/config'

export const AppGate = createGate()

const checkAuthenticatedFx = createEffect<void, string, AxiosError>(async () => refreshToken())

guard({
	clock: AppGate.open,
	filter: () => !!localStorage.getItem(STORAGE_NAME),
	target: checkAuthenticatedFx,
})

sample({
	clock: checkAuthenticatedFx.doneData,
	target: $accessToken,
})
