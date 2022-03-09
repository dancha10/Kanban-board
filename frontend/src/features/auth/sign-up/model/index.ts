import { createEffect, createEvent, sample } from 'effector'
import { AxiosError } from 'axios'

import { ISignUpValidator } from 'features/auth/sign-up/lib/validator'
import { $errorHandler } from 'entities/notification-handler'
import { $accessToken } from 'shared/lib'
import { registration } from 'shared/api'

export const onSubmittedSignUp = createEvent<ISignUpValidator>()

const signUpFx = createEffect<ISignUpValidator, string, AxiosError>(
	async ({ email, nickname, password, passwordConfirm }) =>
		await registration(email, password, passwordConfirm, nickname)
)

sample({
	clock: onSubmittedSignUp,
	target: signUpFx,
})

sample({
	clock: signUpFx.doneData,
	target: $accessToken,
})

sample({
	clock: signUpFx.failData,
	target: $errorHandler,
})
