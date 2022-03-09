import React from 'react'

import { ReactComponent as Close } from './close.svg'

import './style.scss'

interface IHeaderModal {
	title: string
	closeHandler: () => void
}

export const HeaderModal: React.FC<IHeaderModal> = ({ title, closeHandler }) => {
	return (
		<div className='modal-header'>
			<h3>{title}</h3>
			<button className='modal-header__close' onClick={closeHandler}>
				<Close />
			</button>
		</div>
	)
}
