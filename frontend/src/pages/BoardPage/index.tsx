import React, { useContext, useEffect, useState } from 'react'
import { useRequest } from '../../hooks/request.hook'

import { NavBar } from '../../components/molecules/NavBar'
import { Header } from '../../components/molecules/Header'

import { AuthContext } from '../../utils/context/AuthContext'

import './style.scss'
import { ListHeader } from '../../components/atoms/ListHeader'
import { UserList } from '../../components/molecules/UserList'
import { IBoardElements, IUsers } from '../../utils/types/BoardType'

export const BoardPage = () => {
	const auth = useContext(AuthContext)
	const { isLoading, request, error, clearError } = useRequest()

	const [BoardArray, setBoardArray] = useState<Array<IBoardElements>>([])

	useEffect(() => {
		console.log('Board')
		;(async function GetBoardData() {
			const data = await request('/api/board/', 'GET', null, {}, true)
			setBoardArray(data)
			console.log(data)
		})()
	}, [])

	if (isLoading) {
		console.log(isLoading)
		return <p>Loading...</p>
	}

	return (
		<div className='board-page'>
			<Header />
			<div className='board-page__navigation-bar'>
				<NavBar boards={BoardArray} />
			</div>
			<ListHeader title='TODO' />
			<button onClick={auth.logout}>logout</button>
		</div>
	)
}
