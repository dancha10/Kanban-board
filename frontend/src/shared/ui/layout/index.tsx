import React from 'react'

import { AuthBackground } from 'shared/ui/layout/background'
import { Form, ILayoutForm } from 'shared/ui/layout/form'

const background: React.FC = ({ children }) => <AuthBackground>{children}</AuthBackground>
const form: React.FC<ILayoutForm> = ({ title, path, redirectTitle, children }) => (
	<Form title={title} path={path} redirectTitle={redirectTitle}>
		{children}
	</Form>
)

export const Layout = {
	Background: background,
	Form: form,
}
