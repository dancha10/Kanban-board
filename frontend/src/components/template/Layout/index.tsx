import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../molecules/Header'
import { NavBar } from '../../organisms/NavBar'

import './style.scss'

export const Layout = () => {
	return (
		<div className='board-page'>
			<header className='board-page__header'>
				<Header />
			</header>
			<main className='board-page__main'>
				<div className='board-page__navigation-bar'>
					<NavBar />
				</div>
				<aside className='board-page__body'>
					<Outlet />
				</aside>
			</main>
		</div>
	)
}
