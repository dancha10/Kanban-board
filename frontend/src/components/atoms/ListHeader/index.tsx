import React from 'react'
import './style.scss'

interface IListHeader {
	title: string
}

// TODO edit to change

export const ListHeader: React.FC<IListHeader> = ({ title }) => {
	return (
		<div className='list-header'>
			<p className='list-header__title'>{title}</p>
			<button className='list-header__extras'>
				<svg
					width='24'
					height='6'
					viewBox='0 0 24 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M3 6C4.65685 6 6 4.65685 6 3C6 1.34315 4.65685 0 3 0C1.34315 0 0 1.34315 0 3C0 4.65685 1.34315 6 3 6ZM12 6C13.6569 6 15 4.65685 15 3C15 1.34315 13.6569 0 12 0C10.3431 0 9 1.34315 9 3C9 4.65685 10.3431 6 12 6ZM24 3C24 4.65685 22.6569 6 21 6C19.3431 6 18 4.65685 18 3C18 1.34315 19.3431 0 21 0C22.6569 0 24 1.34315 24 3Z'
						fill='#CDCCCA'
					/>
				</svg>
			</button>
		</div>
	)
}
