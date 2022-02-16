import React from 'react'

import { Timer } from '../../atoms/Timer'

import { ICards } from '../../../utils/types/board.type'

import './style.scss'

interface ICard {
	card: ICards
}

export const Card: React.FC<ICard> = ({ card }) => {
	console.log(card.time.start)
	return (
		<div
			className={`card ${card.border && `border--${card.border}`}`}
			onClick={() => {
				console.log('Op')
			}}
			role='presentation'
		>
			<div className='card__container'>
				<div className='card__cover'>
					<img src={card.cover} alt='img' />
				</div>
				<h4 className='card__title'>{card.task}</h4>
				<p className='card__description'>{card.description}</p>

				{card.time && (
					<div className='card__timer'>
						<Timer time={[card.time.start, card.time.end]} />
						{/* TODO DELETE PARSE */}
					</div>
				)}

				<div className='card__count-clip'>
					<span>{card.files.length}</span>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M18.1 12.4L11.9 18.6C10.2 20.3 7.50001 20.3 5.90001 18.6C4.20001 16.9 4.20001 14.2 5.90001 12.6L13.9 4.59998C14.9 3.69998 16.4 3.69998 17.4 4.59998C18.4 5.59998 18.4 7.19998 17.4 8.09998L10.5 15C10.2 15.3 9.70001 15.3 9.40001 15C9.10001 14.7 9.10001 14.2 9.40001 13.9L14.5 8.79998C14.9 8.39998 14.9 7.79998 14.5 7.39998C14.1 6.99998 13.5 6.99998 13.1 7.39998L8.00001 12.6C6.90001 13.7 6.90001 15.4 8.00001 16.5C9.10001 17.5 10.8 17.5 11.9 16.5L18.8 9.59998C20.6 7.79998 20.6 4.99998 18.8 3.19998C17 1.39998 14.2 1.39998 12.4 3.19998L4.40001 11.2C3.20001 12.4 2.60001 14 2.60001 15.6C2.60001 19.1 5.40001 21.8 8.90001 21.8C10.6 21.8 12.1 21.1 13.3 20L19.5 13.8C19.9 13.4 19.9 12.8 19.5 12.4C19.1 12 18.5 12 18.1 12.4Z'
							fill='#999999'
						/>
					</svg>
				</div>
			</div>
		</div>
	)
}
