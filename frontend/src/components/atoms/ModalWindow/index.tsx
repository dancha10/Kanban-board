import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

import { CSSTransition } from 'react-transition-group'
import ClassList from 'classnames'

import './style.scss'

interface IModalWindow {
	modalActive: boolean
	setModalActive: (state: boolean) => void | React.Dispatch<React.SetStateAction<boolean>> | any
	isButtonClose: boolean
}

export const ModalWindow: React.FC<IModalWindow> = ({
	modalActive,
	setModalActive,
	isButtonClose,
	children,
}) => {
	const ModalRef = useRef<HTMLDivElement>(null)
	return ReactDOM.createPortal(
		<CSSTransition
			in={modalActive}
			classNames='modal-bg'
			timeout={300}
			unmountOnExit
			nodeRef={ModalRef}
		>
			<div
				className='modal'
				onClick={() => setModalActive(false)}
				role='presentation'
				ref={ModalRef}
			>
				<div
					className={ClassList('modal__body', { 'modal__body--active': modalActive })}
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
			</div>
		</CSSTransition>,
		document.getElementById('modal')!
	)
}
