import React from 'react'
import { ReactComponent as Check } from '../../../assets/img/check.svg'
import './style.scss'

export interface ButtonType {
	type?: 'button' | 'submit' | 'reset'
	text: string
	onClick?: () => void
}

export const MainButton: React.FC<ButtonType> = ({ type = 'button', text, onClick }) => (
	<button type={type} onClick={onClick} className='main-button'>
		<Check className='main-button__check' />
		{text}
	</button>
)
