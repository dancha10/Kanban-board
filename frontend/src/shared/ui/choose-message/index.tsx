import React from 'react'

import './style.scss'

export const ChooseMessage: React.FC = () => {
	return (
		<div className='board__choose'>
			<div className='board__choose-message'>
				Please select an existing board <p>or</p>
				<button className='board__create'>create a new one</button>
			</div>
		</div>
	)
}
