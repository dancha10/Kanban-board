import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import { ReactComponent as HeaderMenu } from '../lib/list-extras.svg'
import { $titleColumn, titleEdited, titleSaved } from '../model'

import './style.scss'

interface IHeaderColumn {
	columnID: string
	title: string
}

export const HeaderColumn: React.FC<IHeaderColumn> = ({ columnID, title }) => {
	const changeTitle = useStore($titleColumn)

	useEffect(() => {
		titleEdited(title)
	}, [])

	const onChangerTitle = () => {
		if (changeTitle !== title) titleSaved(columnID)
	}

	return (
		<div className='header-column'>
			<input
				className='header-column__title'
				value={changeTitle}
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
