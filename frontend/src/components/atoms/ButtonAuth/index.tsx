import React from 'react'
import { ButtonType } from '../MainButton'
import './style.scss'

export const ButtonAuth: React.FC<ButtonType> = ({ type = 'submit', text, onClick }) => {
	return (
		<button type={type} className='button'>
			{text}
		</button>
	)
}
