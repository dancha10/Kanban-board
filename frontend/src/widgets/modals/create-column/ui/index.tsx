import React from 'react'
import { useStore } from 'effector-react'

import { CreateColumnModel } from 'features/create-column'
import { ControlledModalWindow } from 'entities/controlled-modal'
import { createdColumnTitle, submittedCreateColumn } from 'widgets/modals/create-column/model/model'

export const ModalCreateColumn = () => {
	const isOpen = useStore(CreateColumnModel.$isActive)
	return (
		<ControlledModalWindow
			title='Create new column'
			isOpenState={isOpen}
			openActivation={CreateColumnModel.changedActivation}
			inputHandler={createdColumnTitle}
			maxLength={25}
			placeholder='Enter title column'
			buttonClick={submittedCreateColumn}
			buttonText='Create'
		/>
	)
}
