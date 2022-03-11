import { createEffect, createStore, sample } from 'effector'
import { AxiosError } from 'axios'

import { IUserInfo, MainPageGate } from 'shared/lib'
import { getUserInfo } from 'shared/api'

const userInfoFx = createEffect<void, IUserInfo, AxiosError>(async () => await getUserInfo())

export const $userInformation = createStore<IUserInfo>({
	UID: '',
	email: '',
	nickname: '',
	avatarURL: '',
}).on(userInfoFx.doneData, (_, user) => user)

sample({
	clock: MainPageGate.open,
	target: userInfoFx,
})
