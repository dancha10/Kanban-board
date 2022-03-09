import React from 'react'

import { SignUpForm } from 'features/auth/sign-up'
import { Layout } from 'shared/ui/layout'
import { SCREENS } from 'shared/lib'

const SignUpPage: React.FC = () => {
	return (
		<Layout.Background>
			<Layout.Form
				title='Registration'
				path={SCREENS.SCREENS__LOGIN}
				redirectTitle='Already have an account? Log in'
			>
				<SignUpForm />
			</Layout.Form>
		</Layout.Background>
	)
}

export default SignUpPage
