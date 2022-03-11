import { createEffect, createEvent, sample } from 'effector'

import { $successMessage } from 'entities/notification-handler'

export const copiedID = createEvent<string>()

const copySelectFx = createEffect<string, void, Error>((value: string) =>
	window.navigator.clipboard.writeText(value)
)

sample({
	clock: copiedID,
	target: copySelectFx,
})

sample({
	clock: copySelectFx.doneData,
	fn: () => 'ID copied',
	target: $successMessage,
})
