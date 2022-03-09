import React from 'react'

import { HeaderColumn } from 'features/header-column'
import { CreateCard } from 'features/create-card'
import { CardTask } from 'entities/card-task'
import { IColumns } from 'shared/lib'

import './style.scss'

export const Column: React.FC<IColumns> = ({ _id, title, cards }) => {
	return (
		<div className='column'>
			<HeaderColumn columnID={_id} title={title} />
			<div className='column__card-wrapper'>
				{cards.map(card => (
					<CardTask
						_id={card._id}
						title={card.title}
						description={card.description}
						coverURL={card.coverURL}
						attachment={card.attachment}
						time={card.time}
						borderColor={card.borderColor}
						key={card._id}
					/>
				))}
			</div>
			<CreateCard />
		</div>
	)
}
