import React from 'react'

import { AuthFormByEmail } from 'features/auth/by-email'
import { OAuthByGoogle } from 'features/auth/by-google'
import { Layout } from 'shared/ui/layout'
import { SCREENS } from 'shared/lib'

import './style.scss'

const SignInPage: React.FC = () => {
	return (
		<Layout.Background>
			<Layout.Form
				title='Authorization'
				redirectTitle='Don’t have an account? Register now'
				path={SCREENS.SCREENS__REGISTRATION}
			>
				<AuthFormByEmail />
				<p className='oauth-separator'>или</p>
				<OAuthByGoogle />
			</Layout.Form>
		</Layout.Background>
	)
}

export default SignInPage
