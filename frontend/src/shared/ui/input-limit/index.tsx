import React, { useState } from 'react'
import classList from 'classnames'

import './style.scss'

interface IInputWithLimit {
	placeholder: string
	maxLength: number
	onChange: (value: string) => void
	id?: string
}

export const InputWithLimit: React.FC<IInputWithLimit> = ({
	placeholder,
	maxLength = 25,
	onChange,
	id,
}) => {
	const [isActive, setActive] = useState(false)
	const [remainderLength, setRemainderLength] = useState<number>(maxLength)
	const [learnValue, setLearnValue] = useState<number>(0)

	const changedActive = (value: string): void => (value ? setActive(true) : setActive(false))

	const changeValue = (value: string): void => {
		setRemainderLength(remainderLength - (value.length - learnValue))
		setLearnValue(value.length)
		changedActive(value)
	}

	return (
		<div className='input-limit'>
			<input
				placeholder={placeholder}
				className={classList('input-limit__field', { 'input-limit__field--active': isActive })}
				maxLength={maxLength}
				onChange={event => {
					changeValue(event.target.value)
					onChange(event.target.value)
				}}
				id={id}
			/>
			<p
				className={classList('input-limit__counter', {
					'input-limit__counter--active': isActive,
				})}
			>
				{remainderLength}
			</p>
		</div>
	)
}
