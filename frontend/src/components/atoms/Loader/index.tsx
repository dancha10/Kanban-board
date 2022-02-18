import React from 'react'
import ClassList from 'classnames'
import { TailSpin, Triangle } from 'react-loader-spinner'
import './style.scss'

interface ILoader {
	type?: 'triangle' | 'spin'
	isFull?: boolean
}

export const Loader: React.FC<ILoader> = ({ type = 'triangle', isFull = true }) => {
	if (type === 'triangle')
		return (
			<div className={ClassList('loading', { 'loading--full': isFull })}>
				<Triangle ariaLabel='loading-indicator' height={120} width={120} color='#0AAAF4' />
			</div>
		)
	return (
		<div className={ClassList('loading', { 'loading--full': isFull })}>
			<TailSpin ariaLabel='loading-indicator' height={120} width={120} color='#0AAAF4' />
		</div>
	)
}
