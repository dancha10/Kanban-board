import React from 'react'
import { useStore } from 'effector-react'

import { CreateBoardModel } from 'features/create-board'
import { ControlledModalWindow } from 'entities/controlled-modal'

import { changedNewTitle, createNewBoard } from '../model/model'

import './style.scss'

export const ModalCreateBoard = () => {
	const isOpen = useStore(CreateBoardModel.$isActive)
	return (
		<ControlledModalWindow
			title='Create new board'
			isOpenState={isOpen}
			openActivation={() => CreateBoardModel.changedActivation()}
			inputHandler={changedNewTitle}
			placeholder='Enter title board'
			maxLength={20}
			buttonClick={() => createNewBoard()}
			buttonText='Create'
		/>
	)
}
