import React from 'react'
import classList from 'classnames'

import './style.scss'

interface ICreateButton {
	handler: () => void
	styles?: string
}

export const CreateButton: React.FC<ICreateButton> = ({ styles, handler, children }) => {
	return (
		<button className={classList('create-card ', { [`${styles}`]: styles })} onClick={handler}>
			{children}
		</button>
	)
}
