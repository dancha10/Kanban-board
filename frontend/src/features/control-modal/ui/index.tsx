import React from 'react'

import { InputWithLimit } from 'shared/ui/input-limit'
import { HeaderModal } from 'shared/ui/header-modal'
import { ModalWindow } from 'shared/ui/modal-window'
import { Button } from 'shared/ui/button'

import './style.scss'

interface IControlModal {
	title: string
	isOpenActivator: boolean
	handlerActivation: () => void
	inputHandler: (value: string) => void
	placeholder: string
	maxLength: number
	buttonClick: () => void
	buttonText: string
}

export const ControlModal: React.FC<IControlModal> = ({
	title,
	isOpenActivator,
	handlerActivation,
	inputHandler,
	placeholder,
	maxLength,
	buttonText,
	buttonClick,
}) => {
	return (
		<ModalWindow isOpen={isOpenActivator} handlerActivation={handlerActivation}>
			<HeaderModal title={title} closeHandler={handlerActivation} />
			<div className='modal-body'>
				<InputWithLimit
					placeholder={placeholder}
					onChange={inputHandler}
					maxLength={maxLength}
				/>
			</div>
			<Button
				view='main'
				onClick={() => {
					buttonClick()
					handlerActivation()
				}}
			>
				{buttonText}
			</Button>
		</ModalWindow>
	)
}
