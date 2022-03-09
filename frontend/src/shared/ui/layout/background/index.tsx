import React from 'react'

import { ReactComponent as BackgroundLeft } from './bg-left.svg'
import { ReactComponent as BackgroundRight } from './bg-right.svg'

import './style.scss'

export const AuthBackground: React.FC = ({ children }) => {
	return (
		<div className='auth'>
			<div className='auth__form'>{children}</div>
			<div className='auth__background'>
				<BackgroundLeft className='auth__background--left' />
				<BackgroundRight className='auth__background--right' />
			</div>
		</div>
	)
}
