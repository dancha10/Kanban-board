import React from 'react'
import ReactDOM from 'react-dom'

import ClassList from 'classnames'

import './style.scss'

interface IModalWindow {
	modalActive: boolean
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	isButtonClose: boolean
}

export const ModalWindow: React.FC<IModalWindow> = ({
	modalActive,
	setModalActive,
	isButtonClose,
	children,
}) => {
	return ReactDOM.createPortal(
		<div
			className={ClassList('modal', { 'modal--active': modalActive })}
			onClick={() => setModalActive(false)}
			role='presentation'
		>
			<div
				className={ClassList('modal__wrapper', { 'modal__wrapper--active': modalActive })}
				onClick={(e: React.MouseEvent) => e.stopPropagation()}
				role='presentation'
			>
				{isButtonClose && (
					<button className='modal__close' onClick={() => setModalActive(false)}>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M18 6L6 18' stroke='#7990AA' />
							<path d='M6 6L18 18' stroke='#7990AA' />
						</svg>
					</button>
				)}
				{children}
			</div>
		</div>,
		document.getElementById('modal')!
	)
}
