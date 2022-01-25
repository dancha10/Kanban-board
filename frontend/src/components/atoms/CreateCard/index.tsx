import React from 'react'
import classList from 'classnames'
import './style.scss'

interface CreateCardType {
	type: 'card' | 'column'
	text: string
	onClick?: () => void
}

export const CreateCard: React.FC<CreateCardType> = ({ type = 'card', text, onClick }) => {
	return (
		<button
			className={classList('create-card', { 'create-column': type === 'column' })}
			onClick={onClick}
		>
			{text}
		</button>
	)
}
