import React, { useState } from 'react'
import classList from 'classnames'
import { InputType } from '../BlueInput'
import './style.scss'

interface OpacityInputType extends InputType {
	maxLength: number
}

export const OpacityInput: React.FC<OpacityInputType> = ({
	type = 'text',
	placeholder,
	maxLength = 40,
	id,
}) => {
	const [counter, setCounter] = useState<number>(maxLength)
	const [learnValue, setLearnValue] = useState<number>(0)
	const [isActive, setActive] = useState<boolean>(false)

	const isActivity = (value: string): void =>
		value.length !== 0 ? setActive(true) : setActive(false)

	const ChangeValue = (value: string): void => {
		setCounter(counter - (value.length - learnValue))
		setLearnValue(value.length)
		isActivity(value)
	}

	return (
		<div className='input-opacity'>
			<input
				type={type}
				placeholder={placeholder}
				id={id}
				className={classList('input-opacity__field', {
					'input-opacity__field--active': isActive,
				})}
				onChange={event => ChangeValue(event.target.value)}
				maxLength={maxLength}
			/>
			<p
				className={classList('input-opacity__counter', {
					'input-opacity__counter--active': isActive,
				})}
			>
				{counter}
			</p>
		</div>
	)
}
