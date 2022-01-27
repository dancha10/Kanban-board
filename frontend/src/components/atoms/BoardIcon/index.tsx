import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.scss'

interface IBoardIcon {
	title: string
	color: string
	path: string
}

export const BoardIcon: React.FC<IBoardIcon> = ({ title, color, path }) => {
	const letter = title.split('')[0].toUpperCase()
	return (
		<NavLink
			to={`/b/${path}`}
			className={({ isActive }) => `board-icon${isActive ? ' board-icon--active' : ''} ${color}`}
		>
			{letter}
		</NavLink>
	)
}
