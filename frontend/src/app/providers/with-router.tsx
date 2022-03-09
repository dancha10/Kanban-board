import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Loader } from 'shared/ui/loader'

export const withRouter = (component: () => React.ReactNode) => () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loader />}>{component()}</Suspense>
		</BrowserRouter>
	)
}
