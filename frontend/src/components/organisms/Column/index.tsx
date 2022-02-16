import React from 'react'

import { ListHeader } from '../../atoms/ListHeader'
import { CreateCard } from '../../atoms/CreateCard'
import { Card } from '../../molecules/Card'

import { IColumns } from '../../../utils/types/board.type'

import './style.scss'
import { modalTaskActive } from '../../../store/popup.store'

export const Column: React.FC<IColumns> = ({ title, cards }) => {
	return (
		<div className='column'>
			<div className='column__header'>
				<ListHeader title={title} />
			</div>
			<div className='column__list-column'>
				{cards.map(card => (
					<Card card={card} key={card._id} />
				))}
			</div>
			<div className='column__create-card'>
				<CreateCard type='card' text='+ Add new card' onClick={modalTaskActive} />
			</div>
		</div>
	)
}
