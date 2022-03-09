import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { InputAuth } from 'shared/ui/input-auth'
import { Button } from 'shared/ui/button'

import { onSubmittedLogin } from '../model'
import { IAuthValidator, signInSchema } from '../lib/validator'

import './style.scss'

export const AuthFormByEmail: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthValidator>({ resolver: yupResolver(signInSchema) })

	const LoginHandler: SubmitHandler<IAuthValidator> = data => {
		onSubmittedLogin(data)
	}

	return (
		<form
			onSubmit={handleSubmit(LoginHandler)}
			className='account-form__main-form'
			id='login-form'
		>
			<div className='account-form__field'>
				<InputAuth
					placeholder='Enter email'
					label='Email'
					isError={!!errors.email}
					validator={{ ...register('email') }}
				/>
				{errors.email?.message && (
					<p className='account-form__error-message'>{errors.email?.message}</p>
				)}
			</div>
			<div className='account-form__field'>
				<InputAuth
					placeholder='Enter password'
					label='Password'
					type='password'
					isError={!!errors.password}
					validator={{ ...register('password') }}
				/>
				{errors.password?.message && (
					<p className='account-form__error-message'>{errors.password?.message}</p>
				)}
			</div>
			<Button view='auth' type='submit'>
				Login
			</Button>
		</form>
	)
}
