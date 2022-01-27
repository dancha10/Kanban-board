import React from 'react'

import { ListHeader } from '../../atoms/ListHeader'
import { CreateCard } from '../../atoms/CreateCard'

import { IColumns } from '../../../utils/types/BoardType'
import './style.scss'

export const Column: React.FC<IColumns> = ({ ColumnTitle, cards }) => {
	return (
		<div className='column'>
			<div className='column__header'>
				<ListHeader title={ColumnTitle} />
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
