import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStore } from 'effector-react'

import { FormField } from '../../atoms/FormField'
import { ButtonAuth } from '../../atoms/ButtonAuth'
import { Border } from '../../atoms/Border'
import { Loader } from '../../atoms/Loader'

import { onSubmittedSignUp, signUpFx } from '../../../store/auth.store'

import { SignUpschema } from './validator.schema'
import { ISignUpPayload } from '../../../utils/types/auth.type'
import { SCREENS } from '../../../routes/endpoints'

import '../AuthForm/style.scss'

export const SignUpForm: React.FC = () => {
	const isLoading = useStore(signUpFx.pending)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUpPayload>({
		resolver: yupResolver(SignUpschema),
	})

	const SignUpHandler: SubmitHandler<ISignUpPayload> = data => {
		onSubmittedSignUp(data)
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
