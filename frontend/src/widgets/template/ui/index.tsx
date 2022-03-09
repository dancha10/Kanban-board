import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import { CreateBoardButton } from 'features/create-board'
import { BellNotification } from 'shared/ui/bell-notify'
import { ViewerAvatar } from 'shared/ui/viewer-avatar'
import { NavBoard } from 'entities/nav-board'
import { SCREENS } from 'shared/lib'

import { ReactComponent as Logo } from '../lib/logo.svg'

import './style.scss'

export const Template: React.FC = ({ children }) => {
	return (
		<div className='board'>
			<header className='header'>
				<div className='header__logo'>
					<Logo />
					<Link to={SCREENS.SCREENS__MAIN} className='header__title'>
						Bruhello
					</Link>
				</div>
				<div className='header__main'>
					{/* TODO add search */}
					<div className='header__menu'>
						<BellNotification notificationCount={2} />
						<div className='header__viewer'>
							<ViewerAvatar type='preview' nickname='Bruh' handler={() => {}} />
						</div>
					</div>
				</div>
			</header>
			<main className='board__container'>
				<nav className='board__navbar'>
					<NavBoard />
					<CreateBoardButton />
				</nav>
				<div className='board__content'>
					<Outlet />
				</div>
			</main>
		</div>
	)
}
