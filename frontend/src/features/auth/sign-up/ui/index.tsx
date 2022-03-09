import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { InputAuth } from 'shared/ui/input-auth'
import { Button } from 'shared/ui/button'

import { ISignUpValidator, signUpSchema } from '../lib/validator'
import { onSubmittedSignUp } from '../model'

import './style.scss'

export const SignUpForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUpValidator>({ resolver: yupResolver(signUpSchema) })

	const SignUpHandler: SubmitHandler<ISignUpValidator> = data => {
		onSubmittedSignUp(data)
	}
	return (
		<form
			onSubmit={handleSubmit(SignUpHandler)}
			className='account-form__main-form'
			id='signup-form'
		>
			<div className='account-form__field'>
				<InputAuth
					label='Email'
					placeholder='Enter email'
					validator={{ ...register('email') }}
					isError={!!errors.email}
				/>
				{errors.email?.message && (
					<p className='account-form__error-message'>{errors.email?.message}</p>
				)}
			</div>
			<div className='account-form__field'>
				<InputAuth
					label='Nickname'
					placeholder='Create a nickname'
					validator={{ ...register('nickname') }}
					isError={!!errors.nickname}
				/>
				{errors.nickname?.message && (
					<p className='account-form__error-message'>{errors.nickname?.message}</p>
				)}
			</div>
			<div className='account-form__field'>
				<InputAuth
					label='Password'
					placeholder='Create a password'
					validator={{ ...register('password') }}
					isError={!!errors.password}
				/>
				{errors.password?.message && (
					<p className='account-form__error-message'>{errors.password?.message}</p>
				)}
			</div>
			<div className='account-form__field'>
				<InputAuth
					label='Confirm the password'
					placeholder='Confirm the password'
					validator={{ ...register('passwordConfirm') }}
					isError={!!errors.passwordConfirm}
				/>
				{errors.passwordConfirm?.message && (
					<p className='account-form__error-message'>{errors.passwordConfirm?.message}</p>
				)}
			</div>
			<Button view='auth' type='submit'>
				Registration
			</Button>
		</form>
	)
}
