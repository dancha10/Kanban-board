import React from 'react'
import AuthBgLeft from '../../assets/img/auth-left.svg'
import AuthBgRight from '../../assets/img/auth-right.svg'
import { SignUpForm } from '../../components/organisms/SignUpForm'

import './style.scss'

export const SignUpPage: React.FC = () => (
	<div className='registration'>
		<div className='registration form-wrapper'>
			<SignUpForm />
		</div>
		<div className='background'>
			<img src={AuthBgLeft} alt='svg-1' className='background--bg-left' />
			<img src={AuthBgRight} alt='svg-2' className='background--bg-right' />
		</div>
	</div>
)
