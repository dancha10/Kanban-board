import React, { useState } from 'react'
import classList from 'classnames'
import { Path, UseFormRegister } from 'react-hook-form'
import { ISignUpPayload } from '../../../utils/types/auth.type'
import './style.scss'

export interface InputType {
	type?: 'text' | 'password'
	placeholder: string
	isError?: boolean
}

export interface IBlueInput extends InputType {
	id: Path<ISignUpPayload>
	register: UseFormRegister<ISignUpPayload>
}

export const BlueInput: React.FC<IBlueInput> = ({
	type = 'text',
	placeholder,
	isError = false,
	id,
	register,
}) => {
	const [isActivity, setActivity] = useState<boolean>(false)
	const isActive = (value: string) => (value !== '' ? setActivity(true) : setActivity(false))

	return (
		<div className={classList('input-wrapper', { 'input-wrapper--error': isError })}>
			<input
				{...register(id)}
				type={type}
				placeholder={placeholder}
				onChange={event => isActive(event.target.value)}
				className={classList(
					'input',
					{ 'input--err': isError },
					{ 'input--active': isActivity }
				)}
				id={id}
			/>
		</div>
	)
}
