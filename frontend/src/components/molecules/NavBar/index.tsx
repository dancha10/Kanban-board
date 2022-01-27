import React from 'react'
import { useModal } from '../../../hooks/modal.hook'

import { BoardIcon } from '../../atoms/BoardIcon'

import { IBoard } from '../../../utils/types/BoardType'

import './style.scss'

export const NavBar: React.FC<IBoard> = ({ boards }) => {
	const { ModalCreateBoard, setModalCreateBoard } = useModal()
	return (
		<nav className='navbar'>
			<ul>
				{boards.map(board => (
					<li className='navbar__item' key={board._id}>
						<BoardIcon title={board.title} color={board.background} path={board.BID} />
					</li>
				))}
				<li className='navbar__item'>
					<button className='navbar__add-board' onClick={() => setModalCreateBoard(true)}>
						+
					</button>
				</li>
			</ul>
			{ModalCreateBoard}
		</nav>
	)
}
