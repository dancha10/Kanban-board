import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRequest } from '../../hooks/request.hook'
import { useModal } from '../../hooks/modal.hook'

import { UserList } from '../../components/molecules/UserList'
import { MainButton } from '../../components/atoms/MainButton'
import { Column } from '../../components/organisms/Column'
import { Loader } from '../../components/atoms/Loader'

import { IBoardElements } from '../../utils/types/BoardType'
import './style.scss'

export const BoardPage = () => {
	const { isLoading, request, error, clearError } = useRequest()
	const [CurrentBoard, setCurrentBoard] = useState<IBoardElements>()
	const location = useLocation()

	const { ModalInvite, setModalInvite } = useModal()

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
			<button onClick={() => setModalInvite(true)}>Open</button>
			{ModalInvite}

			<div className='main-body__header'>
				<h1 className='main-body__title'>{CurrentBoard?.title}</h1>
				<div className='main-body__menu-list'>
					<UserList UserList={CurrentBoard?.users} key={CurrentBoard?._id} />
					<div className='main-body__button-area'>
						<MainButton text='+ Invite' />
						<button className='main-body__button-menu'>
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
					</div>
				</div>
			</div>
			<div className='main-body__card-wrapper'>
				{CurrentBoard?.columns.map(column => (
					<Column ColumnTitle={column.ColumnTitle} cards={column.cards} key={column._id} />
				))}
			</div>
		</div>
	)
}
