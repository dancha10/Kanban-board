import React from 'react'

import { ModalWindow } from 'shared/ui/modal-window'
import { HeaderModal } from 'shared/ui/header-modal'
import { InputWithLimit } from 'shared/ui/input-limit'
import { Button } from 'shared/ui/button'

import './style.scss'

interface IControlledModalWindow {
	title: string
	isOpenState: boolean
	openActivation: () => void
	placeholder: string
	inputHandler: (value: string) => void
	maxLength: number
	buttonClick: () => void
	buttonText: string
}

export const ControlledModalWindow: React.FC<IControlledModalWindow> = ({
	title,
	isOpenState,
	openActivation,
	placeholder,
	inputHandler,
	maxLength,
	buttonText,
	buttonClick,
}) => {
	return (
		<ModalWindow isOpen={isOpenState} handlerActivation={openActivation}>
			<HeaderModal title={title} closeHandler={openActivation} />
			<div className='modal-body'>
				<InputWithLimit
					placeholder={placeholder}
					maxLength={maxLength}
					onChange={inputHandler}
				/>
			</div>
			<Button
				view='main'
				onClick={() => {
					buttonClick()
					openActivation()
				}}
			>
				{buttonText}
			</Button>
		</ModalWindow>
	)
}
