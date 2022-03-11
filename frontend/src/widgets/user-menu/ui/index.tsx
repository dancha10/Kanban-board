import React, { useRef } from 'react'
import { useStore } from 'effector-react'
import { CSSTransition } from 'react-transition-group'

import { useClickOutside } from 'shared/lib/hooks'
import { ViewerAvatar } from 'entities/viewer-avatar'
import { CopyID } from 'features/copy-id'
import { Logout } from 'features/auth/logout'
import { IUserInfo } from 'shared/lib'

import { $isOpen, changedOpening } from '../model/model'

import './style.scss'

interface IUserMenu {
	user: IUserInfo
}

export const UserMenu: React.FC<IUserMenu> = ({ user }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const isOpen = useStore($isOpen)
	const { ref } = useClickOutside(changedOpening, true)
	return (
		<CSSTransition
			classNames='modal-animation'
			in={isOpen}
			timeout={300}
			unmountOnExit
			nodeRef={ref}
		>
			<div className='user-menu' ref={ref}>
				<div className='user-menu__header'>
					<ViewerAvatar
						type='menu'
						nickname={user?.nickname}
						avatarURL={user?.avatarURL}
						handler={() => {}}
					/>
					<p className='user-menu__nickname'>{user?.nickname}</p>
				</div>
				<div className='user-menu__id-area'>
					<label htmlFor='copy' className='user-menu__label'>
						Your ID
						<div className='user-menu__id'>
							<input type='text' value={`#${user?.UID}`} ref={inputRef} id='copy' disabled />
							<CopyID identification={inputRef} />
						</div>
					</label>
				</div>
				<div className='user-menu__logout'>
					<Logout logoutCloseWindow={() => changedOpening(false)} />
				</div>
			</div>
		</CSSTransition>
	)
}
