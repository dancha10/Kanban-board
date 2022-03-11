import React from 'react'

import { ReactComponent as LogoutDoor } from '../lib/logout.svg'
import { logoutClicked } from '../model'
import './style.scss'

interface ILogout {
	logoutCloseWindow: (isOpen: boolean) => void
}

export const Logout: React.FC<ILogout> = ({ logoutCloseWindow }) => {
	return (
		<button
			type='button'
			className='logout'
			onClick={() => {
				logoutClicked()
				logoutCloseWindow(false)
			}}
		>
			<LogoutDoor />
			<span>Log out</span>
		</button>
	)
}
