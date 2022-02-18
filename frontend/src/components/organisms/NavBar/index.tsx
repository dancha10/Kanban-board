import React from 'react'
import { useStore } from 'effector-react'

import { useModal } from '../../../hooks/modal.hook'

import { NavbarList } from '../../molecules/NavbarList'
import { Loader } from '../../atoms/Loader'

import { getAllMainInfoFx } from '../../../store/board.store'

import './style.scss'

export const NavBar: React.FC = () => {
	const isLoading = useStore(getAllMainInfoFx.pending)

	const { ModalCreateBoard, setModalCreateBoard } = useModal()

	if (isLoading) return <Loader />

	return (
		<nav className='navbar'>
			<ul>
				<NavbarList />
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
