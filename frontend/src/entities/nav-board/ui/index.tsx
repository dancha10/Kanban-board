import React from 'react'
import { useList } from 'effector-react'

import { BoardViewer } from 'shared/ui/board-viewer'

import { $boards } from '../model'

import './style.scss'

const BoardList: React.FC = () => {
	return useList($boards, ({ BID, title, background }) => (
		<li className='navigation__board'>
			<BoardViewer title={title} path={BID} background={background} />
		</li>
	))
}

export const NavBoard: React.FC = () => {
	return (
		<ul className='navigation__list'>
			<BoardList />
		</ul>
	)
}
