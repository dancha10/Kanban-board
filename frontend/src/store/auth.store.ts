import { createEffect, createEvent, createStore, forward } from 'effector'
import { login, logout, refreshToken, registration } from '../http/API/auth.api'
import { IAuthPayload, ISignUpPayload } from '../utils/types/Auth.types'
import { storageName } from '../http/axios.config'

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
}).on(onSubmittedLogin, (oldField, newField) => newField)

const signUpFx = createEffect<ISignUpPayload, string | undefined, Error>(
	async ({ email, password, passwordConfirm, nickname }) =>
		await registration(email, password, passwordConfirm, nickname)
)

const authorizationFx = createEffect<IAuthPayload, string | undefined, Error>(
	async ({ email, password }) => await login(email, password)
)
const refreshFx = createEffect(async () => await refreshToken())
const checkAuthorization = createEvent()

forward({ from: $singUpForm, to: signUpFx })
forward({ from: $authForm, to: authorizationFx })
forward({ from: checkAuthorization, to: refreshFx })

// -------------------------- Log out --------------------------- //

const logoutFx = createEffect(async () => await logout())
const logoutClicked = createEvent()

forward({ from: logoutFx, to: logoutClicked })

// -------------------------------------------------------------- //

const $accessToken = createStore('')
	.on([signUpFx.doneData, authorizationFx.doneData, refreshFx.doneData], (_, token) => token)
	.reset(logoutClicked)

const localStorageFx = createEffect<string, void, Error>(token => {
	localStorage.setItem(storageName, token)
})

forward({ from: $accessToken, to: localStorageFx })

export {
	onSubmittedSignUp,
	onSubmittedLogin,
	logoutClicked,
	signUpFx,
	authorizationFx,
	checkAuthorization,
	$accessToken,
}
