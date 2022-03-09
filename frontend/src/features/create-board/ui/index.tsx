import React from 'react'

import { changedActivation } from '../model'

import './style.scss'

export const CreateBoardButton = () => {
	return (
		<button className='create-board' onClick={() => changedActivation()}>
			+
		</button>
	)
}
