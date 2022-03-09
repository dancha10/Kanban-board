import React, { useState } from 'react'
import classList from 'classnames'

import './style.scss'

interface IInputAuth {
	type?: 'text' | 'password'
	placeholder: string
	id?: string
	validator: Object
	label: string
	isError: boolean
	onPressEnter?: () => void
}

export const InputAuth: React.FC<IInputAuth> = ({
	type = 'text',
	placeholder,
	onPressEnter,
	id,
	validator,
	label,
	isError,
}) => {
	const [isActive, setActive] = useState(false)
	const changedActive = (value: string): void => (value ? setActive(true) : setActive(false))
	const keyPressedEnter = (code: string) => {
		if (code === 'Enter' && onPressEnter) onPressEnter()
	}
	return (
		<>
			{label && <label htmlFor={label}>{label}</label>}
			<div className={classList('input-container', { 'input-container--error': isError })}>
				<input
					{...validator}
					type={type}
					placeholder={placeholder}
					id={label ? label.split(' ')[1] ?? label.split(' ')[0] : id}
					className={classList(
						'input-auth',
						{ 'input-auth--active': isActive },
						{ 'input-auth--error': isError }
					)}
					onChange={event => changedActive(event.target.value)}
					onKeyPress={event => keyPressedEnter(event.code)}
				/>
			</div>
		</>
	)
}
