import React from 'react'

import { CreateButton } from 'shared/ui/create-button'

import { changedActivation } from '../model'

import './style.scss'

export const CreateColumn = () => {
	return (
		<CreateButton handler={() => changedActivation()} styles='create-column'>
			+ Add new column
		</CreateButton>
	)
}
