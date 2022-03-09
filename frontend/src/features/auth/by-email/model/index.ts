import { createEffect, createEvent, sample } from 'effector'
import { AxiosError } from 'axios'

import { login } from 'shared/api'
import { $accessToken } from 'shared/lib'
import { $errorHandler } from 'entities/notification-handler'

import { IAuthValidator } from '../lib/validator'

export const onSubmittedLogin = createEvent<IAuthValidator>()

const authorizationFx = createEffect<IAuthValidator, string, AxiosError>(
	async ({ email, password }) => await login(email, password)
)

sample({
	clock: onSubmittedLogin,
	target: authorizationFx,
})

sample({
	clock: authorizationFx.doneData,
	target: $accessToken,
})

sample({
	clock: authorizationFx.failData,
	target: $errorHandler,
})
