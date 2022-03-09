export interface IAccessToken {
	accessToken: string
}

export interface IAuthPayload {
	email: string
	password: string
}

export interface ISignUpPayload extends IAuthPayload {
	nickname: string
	passwordConfirm: string
}
