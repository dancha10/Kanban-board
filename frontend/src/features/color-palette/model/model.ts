import { createEffect, createEvent, createStore, sample } from 'effector'
import { AxiosError } from 'axios'

import { setBorderColor } from 'shared/api/http/card.api'
import { getColumnID } from 'shared/lib/getters'

export const switchedColorPalette = createEvent()
export const $isColorPalette = createStore(false).on(switchedColorPalette, (state, _) => !state)

export const changedCheckedColor = createEvent<string>()
export const $isCheckedColor = createStore('').on(changedCheckedColor, (_, color) => color)

export const changeBorderColorFx = createEffect<string, string, AxiosError>(
	async border => await setBorderColor(await getColumnID(), border)
)

sample({
	clock: changedCheckedColor,
	target: changeBorderColorFx,
})
