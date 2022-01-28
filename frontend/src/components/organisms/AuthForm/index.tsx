import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useToasty } from '../../../hooks/toast.hook'
import { useRequest } from '../../../hooks/request.hook'

import { FormField } from '../../atoms/FormField'
import { Border } from '../../atoms/Border'
import { ButtonAuth } from '../../atoms/ButtonAuth'
import { Loader } from '../../atoms/Loader'
import { SCREENS } from '../../../routes/endpoints'

import { ISignUpInputs } from '../SignUpForm'

import './style.scss'

import { AuthContext } from '../../../utils/context/AuthContext'

export interface IAuthInput {
	email: string
	password: string
}

export const AuthForm: React.FC = () => {
	const auth = useContext(AuthContext)
	const notification = useToasty()
	const { isLoading, request, error, clearError } = useRequest()
	const navigate = useNavigate()

	const schema = yup
		.object({
			email: yup
				.string()
				.min(4, 'Minimum email length 4 characters')
				.max(30, 'Minimum email length 30 characters')
				.email('Email entered incorrectly')
				.required('This field is required'),
			password: yup
				.string()
				.min(4, 'Minimum password length 4 characters')
				.required('This field is required'),
		})
		.required('This field is required')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUpInputs>({
		resolver: yupResolver(schema),
	})

	const LoginHandler: SubmitHandler<IAuthInput> = async data => {
		const req = await request('/api/auth/login', 'POST', data)
		auth.login(req.accessToken)
		if (req.accessToken) navigate(SCREENS.SCREENS__MAIN)
	}

	useEffect(() => {
		if (error !== null) {
			notification(error)
		}
		clearError()
	}, [error, clearError])

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
				{/* TODO Change to on /registration */}
				Don’t have an account? Register now
			</NavLink>
			{isLoading && <Loader isFull />}
		</section>
	)
}
