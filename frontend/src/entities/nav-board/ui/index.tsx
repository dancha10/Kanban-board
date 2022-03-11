import React from 'react'
import { useGate, useList } from 'effector-react'

import { BoardViewer } from 'shared/ui/board-viewer'
import { MainPageGate } from 'shared/lib'

import { $boards } from '../model'

import './style.scss'

const BoardList: React.FC = () => {
	useGate(MainPageGate)
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
