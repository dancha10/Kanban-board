import React from 'react'

import { ListHeader } from '../../atoms/ListHeader'
import { CreateCard } from '../../atoms/CreateCard'
import { Card } from '../../molecules/Card'

import { IColumns } from '../../../utils/types/board.type'

import { modalTaskActivatorClicked } from '../../../store/popup.store'
import './style.scss'

type IColumn = Omit<IColumns, '_id'>

export const Column: React.FC<IColumn> = ({ title, cards }) => {
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
				<CreateCard
					type='card'
					text='+ Add new card'
					onClick={() => modalTaskActivatorClicked(true)}
				/>
			</div>
		</div>
	)
}
