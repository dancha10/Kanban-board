declare module '*.svg' {
	import * as React from 'react'

	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>

	const src: string
	export default src
}

declare module '*.svg' {
	// eslint-disable-next-line import/no-duplicates
	import * as React from 'react'

	const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

	export default ReactComponent
}

declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
