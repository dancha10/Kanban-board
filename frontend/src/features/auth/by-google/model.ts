import { createEffect, createEvent, sample } from 'effector'
import { interval } from 'patronum'
import { delay } from 'patronum/delay'

import { $auth } from 'shared/api'
import { $accessToken } from 'shared/lib'

export const startedAuthenticationByGoogle = createEvent()

const loginWindow = window

export const startOpenAuthWindowFx = createEffect(() =>
	loginWindow.open('http://localhost:5000/api/auth/google', '_blank', 'width:500, height: 600')
)

sample({
	clock: startedAuthenticationByGoogle,
	target: startOpenAuthWindowFx,
})

export const authByGoogleFx = createEffect(async () => {
	const res = await $auth.get('/google/success')
	return await res.data.accessToken
})

const { tick } = interval({
	timeout: 500,
	start: startOpenAuthWindowFx.doneData,
	stop: authByGoogleFx.doneData,
})

sample({
	clock: tick,
	target: authByGoogleFx,
})

sample({
	clock: authByGoogleFx.doneData,
	target: $accessToken,
})

const closeAuthWindowFx = createEffect(async () => loginWindow.close())

sample({
	clock: startOpenAuthWindowFx.doneData,
	target: closeAuthWindowFx,
})
