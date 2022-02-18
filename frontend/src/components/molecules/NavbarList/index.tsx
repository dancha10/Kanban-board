import React from 'react'
import { useGate, useList } from 'effector-react'
import { $boardsMainInfo, NavBarGate } from '../../../store/board.store'
import { BoardIcon } from '../../atoms/BoardIcon'

export const NavbarList = () => {
	useGate(NavBarGate)
	return useList($boardsMainInfo, ({ title, background, BID }) => (
		<li className='navbar__item'>
			<BoardIcon title={title} color={background} path={BID} />
		</li>
	))
}
