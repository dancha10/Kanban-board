import React from 'react'

import { ListHeader } from '../../atoms/ListHeader'
import { CreateCard } from '../../atoms/CreateCard'

import './style.scss'
import { IColumns } from '../../../utils/types/BoardType'

export const Column: React.FC<IColumns> = ({ cardName, tasks }) => {
	return (
		<div className='column'>
			<div className='column__header'>
				<ListHeader title={cardName} />
			</div>
			<div className='column__list-column'>
				<p>lala</p>
				<p>lala2</p>
			</div>
			<div className='column__create-card'>
				<CreateCard type='card' text='+ Add new card' />
			</div>
		</div>
	)
}
