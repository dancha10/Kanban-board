import React from 'react'
import './style.scss'

interface IBellNotification {
	notificationCount: number
}

export const BellNotification: React.FC<IBellNotification> = ({ notificationCount }) => {
	return (
		<button
			aria-label='Уведомления'
			onClick={() => console.log('Click')}
			className='bell-notification'
		>
			<svg
				width='30'
				height='30'
				viewBox='0 0 30 30'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M8.0598 11.2118C8.45273 7.6754 11.4419 5 15 5V5C18.5581 5 21.5473 7.6754 21.9402 11.2118L22.2549 14.0445C22.3069 14.5123 22.3329 14.7462 22.3721 14.9758C22.5128 15.8011 22.7822 16.5993 23.1705 17.3411C23.2785 17.5475 23.3995 17.7492 23.6417 18.1528L24.4326 19.471C25.2384 20.8139 25.6412 21.4854 25.354 21.9927C25.0668 22.5 24.2837 22.5 22.7176 22.5H7.28238C5.71627 22.5 4.93322 22.5 4.64599 21.9927C4.35876 21.4854 4.76164 20.8139 5.5674 19.471L6.35832 18.1528C6.60046 17.7492 6.72153 17.5475 6.82954 17.3411C7.21781 16.5993 7.48722 15.8011 7.62794 14.9758C7.66709 14.7462 7.69308 14.5123 7.74505 14.0445L8.0598 11.2118Z'
					stroke='#7990AA'
				/>
				<path
					d='M11.1278 24.5073C11.3414 25.4376 11.8122 26.2596 12.4671 26.8459C13.1221 27.4322 13.9245 27.75 14.75 27.75C15.5755 27.75 16.3779 27.4322 17.0329 26.8459C17.6878 26.2596 18.1586 25.4376 18.3722 24.5073'
					stroke='#7990AA'
					strokeLinecap='round'
				/>
			</svg>
			{notificationCount !== 0 && (
				<div className='bell-notification__count'>{notificationCount}</div>
			)}
		</button>
	)
}
