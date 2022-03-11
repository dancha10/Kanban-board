import React, { useState } from 'react'

import { ReactComponent as HeaderMenu } from '../lib/list-extras.svg'
import { titleEdited, titleSaved } from '../model'

import './style.scss'

interface IHeaderColumn {
	columnID: string
	title: string
}

export const HeaderColumn: React.FC<IHeaderColumn> = ({ columnID, title }) => {
	const [changedTitle, _] = useState(title)

	const onChangerTitle = () => {
		if (changedTitle !== title) titleSaved(columnID)
	}

	return (
		<div className='header-column'>
			<input
				className='header-column__title'
				defaultValue={title}
				onChange={event => titleEdited(event.target.value)}
				onBlur={onChangerTitle}
				onKeyPress={event => {
					if (event.key === 'Enter') onChangerTitle()
				}}
			/>
			<button className='header-column__extras'>
				<HeaderMenu />
			</button>
		</div>
	)
}
