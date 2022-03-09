import React from 'react'

import { ReactComponent as Bell } from './bell.svg'

import './style.scss'

interface IBellNotification {
	notificationCount: number
	handler?: () => void
}

export const BellNotification: React.FC<IBellNotification> = ({ notificationCount, handler }) => {
	return (
		<button aria-label='Уведомления' onClick={handler} className='bell-notification'>
			<Bell />
			{notificationCount !== 0 && (
				<div className='bell-notification__count'>{notificationCount}</div>
			)}
		</button>
	)
}
