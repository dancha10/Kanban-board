import React from 'react'

import { AuthFormByEmail } from 'features/auth/by-email'
import { Layout } from 'shared/ui/layout'
import { SCREENS } from 'shared/lib'

const SignInPage: React.FC = () => {
	const google = async () => {
		// window.open('http://localhost:5000/api/auth/google', '_blank', 'width:500, height: 600')
	}

	const github = () => {
		window.open('http://localhost:5000/api/auth/github', '_blank', 'width:500, height: 600')
	}

	return (
		<Layout.Background>
			<a href='http://localhost:5000/api/auth/google'>Google</a>
			<Layout.Form
				title='Authorization'
				redirectTitle='Don’t have an account? Register now'
				path={SCREENS.SCREENS__REGISTRATION}
			>
				<AuthFormByEmail />
			</Layout.Form>
			<button onClick={google}>Google</button>
			<button onClick={github}>Git</button>
		</Layout.Background>
	)
}

export default SignInPage
