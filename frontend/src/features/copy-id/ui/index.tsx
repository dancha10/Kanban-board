import React from 'react'

import { copiedID } from '../model/model'
import { ReactComponent as Copy } from '../lib/copy.svg'

import './style.scss'

interface ICopyID {
	identification: React.RefObject<HTMLInputElement>
}

export const CopyID: React.FC<ICopyID> = ({ identification }) => {
	return (
		<button className='copy-id' onClick={() => copiedID(identification.current?.value!)}>
			<Copy />
		</button>
	)
}
