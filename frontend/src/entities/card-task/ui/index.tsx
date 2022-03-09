import React from 'react'
import classList from 'classnames'

import { ICards } from 'shared/lib'

import { ReactComponent as PaperClip } from '../lib/paperclip.svg'

import './style.scss'

export const CardTask: React.FC<ICards> = ({
	_id,
	title,
	description,
	borderColor,
	coverURL,
	attachment,
	time: { start, end, isCompleted },
}) => {
	return (
		<div
			className={classList('card', { [`card--${borderColor}`]: borderColor })}
			onClick={() => {
				console.log('Op')
			}}
			role='presentation'
		>
			<div className='card__container'>
				{coverURL && (
					<div className='card__cover'>
						<img src={coverURL} alt='img' />
					</div>
				)}
				<h4 className='card__title'>{title}</h4>
				<p className='card__description'>{description}</p>

				{start ||
					(end && (
						<div className='card__timer'>
							{/*	<Timer time={[start, end]} />
							 TODO DELETE PARSE */}
						</div>
					))}

				<div className='card__count-clip'>
					<span>{attachment.length}</span>
					<PaperClip />
				</div>
			</div>
		</div>
	)
}
