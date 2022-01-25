import React, { useState } from 'react'
import classList from 'classnames'
import './style.scss'
import { Path, UseFormRegister } from 'react-hook-form'
import { ISignUpInputs } from '../../organisms/SignUpForm'
import { IAuthInput } from '../../organisms/AuthForm'

export interface InputType {
	type?: 'text' | 'password'
	placeholder: string
	isError?: boolean
	id: Path<ISignUpInputs>
	register: UseFormRegister<ISignUpInputs>
}

export const BlueInput: React.FC<InputType> = ({
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
