import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useGate, useStore } from 'effector-react'

import { ModalCreateBoard, ModalCreateCard, ModalCreateColumn } from 'widgets/modals'
import { UserMenu, UserMenuModel } from 'widgets/user-menu'
import { CreateBoardButton } from 'features/create-board'
import { ViewerAvatar } from 'entities/viewer-avatar'
import { NavBoard } from 'entities/nav-board'
import { BellNotification } from 'shared/ui/bell-notify'
import { MainPageGate, SCREENS } from 'shared/lib'

import { $userInformation } from '../model/model'
import { ReactComponent as Logo } from '../lib/logo.svg'

import './style.scss'

const Template: React.FC = () => {
	useGate(MainPageGate)
	const user = useStore($userInformation)
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
						<BellNotification notificationCount={9} />
						<div className='header__viewer'>
							<ViewerAvatar
								type='preview'
								nickname={user?.nickname}
								avatarURL={user?.avatarURL}
								handler={() => UserMenuModel.changedOpening(true)}
							/>
						</div>
						<UserMenu user={user} />
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
			<ModalCreateBoard />
			<ModalCreateColumn />
			<ModalCreateCard />
		</div>
	)
}

export default Template
