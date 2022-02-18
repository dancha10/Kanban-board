import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStore } from 'effector-react'

import { ButtonAuth } from '../../atoms/ButtonAuth'
import { FormField } from '../../atoms/FormField'
import { Border } from '../../atoms/Border'
import { Loader } from '../../atoms/Loader'

import { authorizationFx, onSubmittedLogin } from '../../../store/auth.store'

import { authSchema } from './validator.schema'
import { IAuthPayload, ISignUpPayload } from '../../../utils/types/auth.type'
import { SCREENS } from '../../../routes/endpoints'

import './style.scss'

export const AuthForm: React.FC = () => {
	const isLoading = useStore(authorizationFx.pending)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUpPayload>({
		resolver: yupResolver(authSchema),
	})

	const LoginHandler: SubmitHandler<IAuthPayload> = data => {
		onSubmittedLogin(data)
	}

	return (
		<section className='account-form layout-center'>
			<h2>Authorization</h2>
			<form
				id='login-form'
				className='account-form__main-form'
				onSubmit={handleSubmit(LoginHandler)}
			>
				<div className='account-form__field'>
					<FormField
						label='Email'
						placeholder='Enter email'
						id='email'
						isError={!!errors.email}
						register={register}
					/>
					{errors.email?.message && (
						<p className='account-form__error-message'>{errors.email?.message}</p>
					)}
				</div>
				<div className='account-form__field'>
					<FormField
						label='Password'
						placeholder='Enter password'
						id='password'
						isError={!!errors.password}
						register={register}
						type='password'
					/>
					{errors.password?.message && (
						<p className='account-form__error-message'>{errors.password?.message}</p>
					)}
				</div>
				<ButtonAuth text='Login' onClick={() => {}} />
			</form>
			<Border />
			<NavLink to={`${SCREENS.SCREENS__REGISTRATION}`} className='account-form__redirect'>
				Don’t have an account? Register now
			</NavLink>
			{isLoading && <Loader />}
		</section>
	)
}
