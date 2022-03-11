import React from 'react'

import { startedAuthenticationByGoogle } from 'features/auth/by-google/model'

import { ReactComponent as Google } from '../lib/google.svg'

import './style.scss'

export const OAuthByGoogle = () => {
	return (
		<button className='auth-google' onClick={() => startedAuthenticationByGoogle()}>
			<Google /> Sign in with Google
		</button>
	)
}
