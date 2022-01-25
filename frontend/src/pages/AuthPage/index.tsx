import React from 'react'
import AuthBgLeft from '../../img/auth-left.svg'
import AuthBgRight from '../../img/auth-right.svg'

import { AuthForm } from '../../components/organisms/AuthForm'
import './style.scss'

export const AuthPage: React.FC = () => {
	return (
		<div className='auth'>
			<div className='auth form-wrapper'>
				<AuthForm />
			</div>
			<div className='background'>
				<img src={AuthBgLeft} alt='svg-1' className='background--bg-left' />
				<img src={AuthBgRight} alt='svg-2' className='background--bg-right' />
			</div>
		</div>
	)
}
