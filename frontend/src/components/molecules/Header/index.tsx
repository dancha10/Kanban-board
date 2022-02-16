import React from 'react'
import { Link } from 'react-router-dom'
import { BellNotification } from '../../atoms/BellNotification'
import { Avatar } from '../../atoms/Avatar'

import { SCREENS } from '../../../routes/endpoints'
import './style.scss'

import { UserMenu } from '../UserMenu'
import { userMenuActivate } from '../../../store/popup.store'

export const Header = () => {
	return (
		<div className='header'>
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
					<h1>
						<Link to={SCREENS.SCREENS__MAIN} className='header__title'>
							Bruhello
						</Link>
					</h1>
				</div>
				<div className='header__menu'>
					<div className='header__notification'>
						<BellNotification notificationCount={2} />
					</div>
					<div className='header__avatar'>
						<Avatar
							type='icon'
							nickname='Bublick'
							avatar={undefined}
							handler={userMenuActivate}
						/>
						<UserMenu />
					</div>
				</div>
			</div>
		</div>
	)
}
