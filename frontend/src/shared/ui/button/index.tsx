import React from 'react'

import { ReactComponent as Check } from './check.svg'

import './style.scss'

interface IButton {
	type?: 'button' | 'submit' | 'reset'
	view: 'auth' | 'main'
	onClick?: () => void
}

export const Button: React.FC<IButton> = ({ type = 'button', view, onClick, children }) => {
	if (view === 'auth')
		return (
			<button type={type} className='button-auth' onClick={onClick}>
				{children}
			</button>
		)
	return (
		<button type={type} className='button-main' onClick={onClick}>
			<Check className='button-main__check' />
			{children}
		</button>
	)
}
