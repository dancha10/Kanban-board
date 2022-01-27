import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../molecules/Header'
import { NavBar } from '../../molecules/NavBar'
import { useRequest } from '../../../hooks/request.hook'
import { IBoardElements } from '../../../utils/types/BoardType'

import './style.scss'

export const Layout = () => {
	const { isLoading, request, error, clearError } = useRequest()

	const [BoardArray, setBoardArray] = useState<Array<IBoardElements>>([])

	useEffect(() => {
		console.log('Board')
		;(async function GetBoardData() {
			const data = await request('/api/board/', 'GET', null, {}, true)
			setBoardArray(data)
		})()
	}, [])

	return (
		<div className='board-page'>
			<header className='board-page__header'>
				<Header />
			</header>
			<main className='board-page__main'>
				<div className='board-page__navigation-bar'>
					<NavBar boards={BoardArray} />
				</div>
				<aside className='board-page__body'>
					<Outlet />
				</aside>
			</main>
		</div>
	)
}
