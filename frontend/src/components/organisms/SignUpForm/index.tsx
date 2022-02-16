import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useStore } from 'effector-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormField } from '../../atoms/FormField'
import { ButtonAuth } from '../../atoms/ButtonAuth'
import { Border } from '../../atoms/Border'
import { Loader } from '../../atoms/Loader'

import { useToasty } from '../../../hooks/toast.hook'

import { SCREENS } from '../../../routes/endpoints'
import { ISignUpPayload } from '../../../utils/types/auth.type'

import { $accessToken, onSubmittedSignUp, signUpFx } from '../../../store/auth.store'
import { $ErrorStore, clearError } from '../../../store/Error/error.store'

import '../AuthForm/style.scss'

export const SignUpForm: React.FC = () => {
	const token = useStore($accessToken)
	const isLoading = useStore(signUpFx.pending)
	const error = useStore($ErrorStore)

	const notification = useToasty()
	const navigate = useNavigate()

	const schema = yup
		.object({
			email: yup
				.string()
				.min(4, 'Minimum email length 4 characters')
				.max(30, 'Maximum email length 4 characters')
				.email('Email entered incorrectly')
				.required(),
			nickname: yup
				.string()
				.min(3, 'Minimum nickname length 3 characters')
				.max(20, 'Maximum nickname length 20 characters')
				.required('This field is required'),
			password: yup
				.string()
				.min(4, 'Minimum password length 3 characters')
				.required('This field is required'),
			passwordConfirm: yup
				.string()
				.min(4, 'Minimum password length 3 characters')
				.required('This field is required'),
		})
		.required('This field is required')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUpPayload>({
		resolver: yupResolver(schema),
	})

	useEffect(() => {
		if (error !== null) {
			notification(error)
		}
		clearError()
	}, [error, clearError])

	const SignUpHandler: SubmitHandler<ISignUpPayload> = async data => {
		onSubmittedSignUp(data)
		if (token && !isLoading) navigate(SCREENS.SCREENS__MAIN)
	}

	return (
		<section className='account-form layout-center'>
			<h2>Registration</h2>
			<form
				id='registration-form'
				className='account-form__main-form'
				onSubmit={handleSubmit(SignUpHandler)}
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
						label='Nickname'
						placeholder='Create a nickname'
						id='nickname'
						isError={!!errors.nickname}
						register={register}
					/>
					{errors.nickname?.message && (
						<p className='account-form__error-message'>{errors.nickname?.message}</p>
					)}
				</div>
				<div className='account-form__field'>
					<FormField
						label='Password'
						placeholder='Create a password'
						id='password'
						isError={!!errors.password}
						register={register}
						type='password'
					/>
					{errors.password?.message && (
						<p className='account-form__error-message'>{errors.password?.message}</p>
					)}
				</div>
				<div className='account-form__field'>
					<FormField
						label='Confirm the password'
						placeholder='Confirm the password'
						id='passwordConfirm'
						isError={!!errors.passwordConfirm}
						register={register}
						type='password'
					/>
					{errors.passwordConfirm?.message && (
						<p className='account-form__error-message'>{errors.passwordConfirm?.message}</p>
					)}
				</div>
				<ButtonAuth text='Registration' onClick={() => {}} />
			</form>
			<Border />
			<NavLink to={`${SCREENS.SCREENS__LOGIN}`} className='account-form__redirect'>
				Already have an account? Log in
			</NavLink>
			{isLoading && <Loader />}
		</section>
	)
}
