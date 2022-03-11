import React from 'react'
import { useNavigate } from 'react-router-dom'

import { SCREENS } from 'shared/lib'

import { ReactComponent as LogoutDoor } from '../lib/logout.svg'
import { logoutClicked } from '../model'

import './style.scss'

interface ILogout {
	logoutCloseWindow: (isOpen: boolean) => void
}

export const Logout: React.FC<ILogout> = ({ logoutCloseWindow }) => {
	const navigate = useNavigate()
	return (
		<button
			type='button'
			className='logout'
			onClick={() => {
				logoutClicked()
				logoutCloseWindow(false)
				navigate(SCREENS.SCREENS__LOGIN)
			}}
		>
			<LogoutDoor />
			<span>Log out</span>
		</button>
	)
}
