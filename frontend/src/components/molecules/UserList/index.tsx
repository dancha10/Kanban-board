import React from 'react'
import { Avatar } from '../../atoms/Avatar'
import { IUsers } from '../../../utils/types/BoardType'

import './style.scss'

export interface IUserList {
	UserList: Array<IUsers> | undefined
}

export const UserList: React.FC<IUserList> = ({ UserList }) => {
	return (
		<div className='user-list' key='fsdfsd'>
			{UserList &&
				UserList.map(user => {
					return (
						<div className='user-list__face' key={user._id + user.nickname}>
							<Avatar
								type='icon'
								nickname={user.nickname}
								avatar='https://cdnb.artstation.com/p/assets/images/images/039/048/331/large/michael-mao-c1-2.jpg?1624812008'
							/>
						</div>
					)
				})}
		</div>
	)
}
