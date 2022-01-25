import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormField } from '../../atoms/FormField'
import { ButtonAuth } from '../../atoms/ButtonAuth'
import { Border } from '../../atoms/Border'
import { SCREENS } from '../../../routes/endpoints'

import '../AuthForm/style.scss'
import { IAuthInput } from '../AuthForm'
import { useRequest } from '../../../hooks/request.hook'
import { useToasty } from '../../../hooks/toast.hook'
import { AuthContext } from '../../../utils/context/AuthContext'

export interface ISignUpInputs extends IAuthInput {
	nickname: string
	password_confirm: string
}

export const SignUpForm: React.FC = () => {
	const auth = useContext(AuthContext)
	const notification = useToasty()
	const { isLoading, request, error, clearError } = useRequest()
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
			password_confirm: yup
				.string()
				.min(4, 'Minimum password length 3 characters')
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

	useEffect(() => {
		if (error !== null) {
			notification(error)
		}
		clearError()
	}, [error, clearError])

	const SignUpHandler: SubmitHandler<ISignUpInputs> = async data => {
		console.log(error)
		const req = await request('/api/auth/signup', 'POST', data)
		auth.login(req.accessToken)
		navigate(SCREENS.SCREENS__MAIN) // TODO Delete
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
						id='password_confirm'
						isError={!!errors.password_confirm}
						register={register}
						type='password'
					/>
					{errors.password_confirm?.message && (
						<p className='account-form__error-message'>{errors.password_confirm?.message}</p>
					)}
				</div>
				<ButtonAuth text='Registration' onClick={() => {}} />
			</form>
			<Border />
			<NavLink to={`${SCREENS.SCREENS__LOGIN}`} className='account-form__redirect'>
				Already have an account? Log in
			</NavLink>
		</section>
	)
}
