import React from 'react'

import { ReactComponent as ChangePhoto } from './change_photo.svg'

import './style.scss'

export interface IViewerAvatar {
	type: 'preview' | 'menu'
	nickname: string
	avatarURL?: string
	handler?: () => void
}

export const ViewerAvatar: React.FC<IViewerAvatar> = ({ type, avatarURL, nickname, handler }) => {
	return (
		<button
			className={`viewer-avatar ${avatarURL ? 'viewer-avatar__img' : 'viewer-avatar__name'}`}
			onClick={handler}
		>
			{avatarURL ? <img src={avatarURL} alt='Profile' /> : nickname.split('')[0]}
			{type === 'menu' && (
				<div className='viewer-overlay'>
					<ChangePhoto />
				</div>
			)}
		</button>
	)
}
