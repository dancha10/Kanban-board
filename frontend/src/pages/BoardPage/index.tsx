import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import { useLocation } from 'react-router-dom'
import { useModal } from '../../hooks/modal.hook'
import { CreateCard } from '../../components/atoms/CreateCard'
import { UserList } from '../../components/molecules/UserList'
import { MainButton } from '../../components/atoms/MainButton'
import { Column } from '../../components/organisms/Column'
import { Loader } from '../../components/atoms/Loader'
import { BoardMenu } from '../../components/atoms/BoardMenu'
import { ModalTask } from '../../components/molecules/ModalTask'
import { boardMenuActivatorClicked } from '../../store/popup.store'
import { $currentBoard, getCurrentBoardByIdFx, sentBoardId } from '../../store/board.store'
import './style.scss'

export const BoardPage = () => {
	const location = useLocation()

	const { ModalInvite, setModalInvite, ModalCreateColumn, setModalCreateColumn } = useModal()

	useEffect(() => {
		sentBoardId(location.pathname.split('/b/')[1])
	}, [location])

	const currentBoard = useStore($currentBoard)
	const isLoading = useStore(getCurrentBoardByIdFx.pending)

	useEffect(() => {
		console.log(currentBoard)
	}, [currentBoard])

	if (isLoading) return <Loader />

	return (
		<div className='main-body'>
			{ModalInvite}
			<div className='main-body__header'>
				<h1 className='main-body__title'>{currentBoard?.title}</h1>
				<div className='main-body__menu-list'>
					<UserList UserList={currentBoard?.users} key={currentBoard?._id} />
					<div className='main-body__button-area'>
						<MainButton text='+ Invite' onClick={() => setModalInvite(true)} />
						<button
							className='main-body__button-menu'
							onClick={() => boardMenuActivatorClicked(true)}
						>
							<svg
								width='24'
								height='25'
								viewBox='0 0 24 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M5 7.67749H19' stroke='#213864' />
								<path d='M5 12.5161H19' stroke='#213864' />
								<path d='M5 17.355H19' stroke='#213864' />
							</svg>
						</button>
						<BoardMenu />
					</div>
				</div>
			</div>
			<div className='main-body__card-wrapper'>
				{currentBoard?.columns.map(column => (
					<Column title={column?.title} cards={column?.cards} key={column?._id} />
				))}
				<CreateCard
					type='column'
					text='+ Add new column'
					onClick={() => setModalCreateColumn(true)}
				/>
				{ModalCreateColumn}
				<ModalTask />
			</div>
		</div>
	)
}
