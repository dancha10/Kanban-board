import React from 'react'

import './style.scss'

export const MainPage = () => {
	return (
		<div className='board-page__choose-wrapper'>
			<div className='board-page__choose-message layout-center'>
				Please select an existing board <p>or</p>
				<button className='board-page__create'>create a new one</button>
			</div>
		</div>
	)
}
