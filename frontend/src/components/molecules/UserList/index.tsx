import React from 'react'
import { Avatar, IAvatar } from '../../atoms/Avatar'

import './style.scss'
import { IUsers } from '../../../utils/types/BoardType'

export interface IUserList {
	UserList: Array<IUsers>
}

export const UserList: React.FC<IUserList> = ({ UserList }) => {
	const newUserList = UserList.splice(0, 7)
	if (UserList.length >= 7) {
		return (
			<>
				{newUserList.map(user => {
					return (
						<div className='user-list__face' key={user.nickname}>
							<Avatar type='icon' nickname={user.nickname} avatar={user.avatar} />
						</div>
					)
				})}
				<div className='user-list__counter'>{`${UserList.length - 7}`}</div>
			</>
		)
	}
	return (
		<div className='user-list'>
			{UserList.map(user => {
				return (
					<div className='user-list__face' key={user.nickname}>
						<Avatar type='icon' nickname={user.nickname} avatar={user.avatar} />
					</div>
				)
			})}
		</div>
	)
}
