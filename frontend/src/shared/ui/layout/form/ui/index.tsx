import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.scss'

export interface ILayoutForm {
	title: string
	path: string
	redirectTitle: string
}

export const Form: React.FC<ILayoutForm> = ({ title, path, redirectTitle, children }) => {
	return (
		<div className='account-form'>
			<h2>{title}</h2>
			{children}
			<hr />
			<NavLink to={path} className='account-form__redirect'>
				{redirectTitle}
			</NavLink>
		</div>
	)
}
