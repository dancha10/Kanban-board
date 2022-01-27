import React from 'react'

import { IBoard } from '../../../utils/types/BoardType'
import { BoardIcon } from '../../atoms/BoardIcon'

import './style.scss'

export const NavBar: React.FC<IBoard> = ({ boards }) => {
	console.log(boards)
	return (
		<nav className='navbar'>
			<ul>
				{boards.map(board => (
					<li className='navbar__item' key={board._id}>
						<BoardIcon title={board.title} color={board.background} path={board.BID} />
					</li>
				))}
				<li className='navbar__item'>
					<button className='navbar__add-board'>+</button>
				</li>
			</ul>
		</nav>
	)
}
