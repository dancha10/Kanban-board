import React from 'react'

import { CreateButton } from 'shared/ui/create-button'

import { changedActivation, createdCard } from './model'

interface ICreateCard {
	columnID: string
}

export const CreateCard: React.FC<ICreateCard> = ({ columnID }) => {
	const createdCardHandler = () => {
		changedActivation()
		createdCard(columnID)
	}
	return <CreateButton handler={createdCardHandler}>+ Add new card</CreateButton>
}
