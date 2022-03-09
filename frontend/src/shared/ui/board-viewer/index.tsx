import React from 'react'
import { NavLink } from 'react-router-dom'

import { SharedType } from 'shared/lib'

import './style.scss'

interface IBoardViewer extends SharedType.ColorType {
	title: string
	path: string
}

export const BoardViewer: React.FC<IBoardViewer> = ({ title, path, background }) => {
	const letter = title.charAt(0).toUpperCase()
	return (
		<NavLink
			to={`/b/${path}`}
			className={({ isActive }) =>
				`board-viewer${isActive ? ' board-viewer--active' : ''} ${background}`
			}
		>
			{letter}
		</NavLink>
	)
}
