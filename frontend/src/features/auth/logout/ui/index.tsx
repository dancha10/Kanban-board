import React from 'react'

import { ReactComponent as LogoutDoor } from '../lib/logout.svg'
import { logoutClicked } from '../model'
import './style.scss'

export const Logout: React.FC = () => {
	return (
		<button type='button' className='logout' onClick={() => logoutClicked()}>
			<LogoutDoor />
			<span>Log out</span>
		</button>
	)
}
