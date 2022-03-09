import React from 'react'
import classList from 'classnames'
import { TailSpin, Triangle } from 'react-loader-spinner'
import './style.scss'

interface ILoader {
	type?: 'triangle' | 'spin'
	isFull?: boolean
}

export const Loader: React.FC<ILoader> = ({ type = 'triangle', isFull = true }) => {
	if (type === 'triangle')
		return (
			<div className={classList('loading', { 'loading--full': isFull })}>
				<Triangle ariaLabel='loading-indicator' height={125} width={125} color='#0AAAF4' />
			</div>
		)
	return (
		<div className={classList('loading', { 'loading--full': isFull })}>
			<TailSpin ariaLabel='loading-indicator' height={125} width={125} color='#0AAAF4' />
		</div>
	)
}
