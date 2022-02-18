import { createEffect, createEvent, createStore, forward, sample } from 'effector'
import { AxiosError } from 'axios'
import { login, logout, refreshToken, registration } from '../http/API/auth.api'
import { IAuthPayload, ISignUpPayload } from '../utils/types/auth.type'
import { storageName } from '../http/axios.config'
import { $error } from './error.store'

const onSubmittedSignUp = createEvent<ISignUpPayload>()
const $singUpForm = createStore<ISignUpPayload>({
	email: '',
	password: '',
	passwordConfirm: '',
	nickname: '',
}).on(onSubmittedSignUp, (_, fields) => fields)

const onSubmittedLogin = createEvent<IAuthPayload>()
const $authForm = createStore<IAuthPayload>({
	email: '',
	password: '',
}).on(onSubmittedLogin, (_, fields) => fields)

const signUpFx = createEffect<ISignUpPayload, string, AxiosError>(
	async ({ email, password, passwordConfirm, nickname }) =>
		await registration(email, password, passwordConfirm, nickname)
)

const authorizationFx = createEffect<IAuthPayload, string, AxiosError>(
	async ({ email, password }) => await login(email, password)
)
const refreshFx = createEffect<void, string, AxiosError>(async () => await refreshToken())
const checkAuthorization = createEvent()

forward({ from: $singUpForm, to: signUpFx })
forward({ from: $authForm, to: authorizationFx })
forward({ from: checkAuthorization, to: refreshFx })

// -------------------------- Log out --------------------------- //

const logoutFx = createEffect(async () => await logout())
const logoutClicked = createEvent()

forward({ from: logoutClicked, to: logoutFx })

// -------------------------------------------------------------- //

const $accessToken = createStore('').reset(logoutClicked)

const localStorageFx = createEffect<string, void, Error>(token => {
	localStorage.setItem(storageName, token)
})

forward({
	from: [signUpFx.doneData, authorizationFx.doneData, refreshFx.doneData],
	to: $accessToken,
})

sample({
	source: $accessToken,
	target: localStorageFx,
})

// ------------------- Error Handler ---------------------------- //

sample({
	clock: [signUpFx.failData, authorizationFx.failData, refreshFx.failData],
	fn: error => error?.response?.data?.message,
	target: $error,
})

// -------------------------------------------------------------- //

export {
	onSubmittedSignUp,
	onSubmittedLogin,
	logoutClicked,
	signUpFx,
	authorizationFx,
	refreshFx,
	checkAuthorization,
	$accessToken,
}
