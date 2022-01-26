import React from 'react'
import { BellNotification } from '../../atoms/BellNotification'
import { Avatar } from '../../atoms/Avatar'

import './style.scss'

export const Header = () => {
	return (
		<header className='header'>
			<div className='header__container'>
				<div className='header__logo'>
					<svg
						width='34'
						height='34'
						viewBox='0 0 34 34'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect
							x='34'
							y='34'
							width='34'
							height='34'
							rx='3'
							transform='rotate(-180 34 34)'
							fill='#00E7FF'
						/>
						<rect
							x='14.7899'
							y='29.5798'
							width='10.37'
							height='14.875'
							rx='1.44'
							transform='rotate(-180 14.7899 29.5798)'
							fill='#0AAAF4'
						/>
						<rect
							x='29.58'
							y='29.5798'
							width='10.37'
							height='23.375'
							rx='1.44'
							transform='rotate(-180 29.58 29.5798)'
							fill='#F8BD1C'
						/>
					</svg>
					<h1>Bruhello</h1>
				</div>
				<div className='header__menu'>
					<div className='header__notification'>
						<BellNotification notificationCount={2} />
					</div>
					<div className='header__avatar'>
						<Avatar type='icon' nickname='Bublick' avatar={undefined} />
					</div>
				</div>
			</div>
		</header>
	)
}