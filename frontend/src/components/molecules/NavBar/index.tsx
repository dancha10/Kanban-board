import React from 'react'
import { useGate, useStore } from 'effector-react'

import { BoardIcon } from '../../atoms/BoardIcon'
import { Loader } from '../../atoms/Loader'

import { useModal } from '../../../hooks/modal.hook'

import { NavBarGate, $boardsMainInfo, getAllMainInfoFx } from '../../../store/board.store'
import './style.scss'

export const NavBar: React.FC = () => {
	useGate(NavBarGate)
	const boards = useStore($boardsMainInfo)
	const isLoading = useStore(getAllMainInfoFx.pending)

	const { ModalCreateBoard, setModalCreateBoard } = useModal()

	return (
		<nav className='navbar'>
			{isLoading && <Loader isFull />}
			<ul>
				{boards &&
					boards.map(board => (
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
