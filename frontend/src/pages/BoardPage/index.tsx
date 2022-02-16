import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRequest } from '../../hooks/request.hook'
import { useModal } from '../../hooks/modal.hook'

import { CreateCard } from '../../components/atoms/CreateCard'
import { UserList } from '../../components/molecules/UserList'
import { MainButton } from '../../components/atoms/MainButton'
import { Column } from '../../components/organisms/Column'
import { Loader } from '../../components/atoms/Loader'
import { BoardMenu } from '../../components/atoms/BoardMenu'
import { ModalTask } from '../../components/molecules/ModalTask'

import { IBoard } from '../../utils/types/board.type'

import './style.scss'

import { boardMenuActive } from '../../store/popup.store'

export const BoardPage = () => {
	const { isLoading, request, error, clearError } = useRequest()
	const [CurrentBoard, setCurrentBoard] = useState<IBoard>()
	const location = useLocation()

	const { ModalInvite, setModalInvite, ModalCreateColumn, setModalCreateColumn } = useModal()

	useEffect(() => {
		console.log('Board-Page')
		;(async function GetBoardID() {
			const data = await request(
				`/api/board/${location.pathname.split('/b/')[1]}`,
				'GET',
				null,
				{},
				true
			)
			setCurrentBoard(data)
			console.log(data)
		})()
	}, [location])

	if (isLoading) return <Loader />

	return (
		<div className='main-body'>
			{ModalInvite}
			<div className='main-body__header'>
				<h1 className='main-body__title'>{CurrentBoard?.title}</h1>
				<div className='main-body__menu-list'>
					<UserList UserList={CurrentBoard?.users} key={CurrentBoard?._id} />
					<div className='main-body__button-area'>
						<MainButton text='+ Invite' onClick={() => setModalInvite(true)} />
						<button className='main-body__button-menu' onClick={() => boardMenuActive}>
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
				{CurrentBoard?.columns.map(column => (
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
