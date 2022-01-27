import React from 'react'
import { TailSpin, Triangle } from 'react-loader-spinner'
import './style.scss'

interface ILoader {
	type?: 'triangle' | 'spin'
}

export const Loader: React.FC<ILoader> = ({ type = 'triangle' }) => {
	if (type === 'triangle')
		return (
			<div className='loading'>
				<Triangle ariaLabel='loading-indicator' height={120} width={120} color='#0AAAF4' />
			</div>
		)
	return (
		<div className='loading'>
			<TailSpin ariaLabel='loading-indicator' height={120} width={120} color='#0AAAF4' />
		</div>
	)
}
