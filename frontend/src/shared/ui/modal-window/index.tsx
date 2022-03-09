import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import classList from 'classnames'

import './style.scss'

interface IModalWindow {
	isOpen: boolean
	handlerActivation: () => void
}

export const ModalWindow: React.FC<IModalWindow> = ({ isOpen, handlerActivation, children }) => {
	const modalRef = useRef<HTMLDivElement>(null)
	return ReactDOM.createPortal(
		<CSSTransition
			classNames='modal-animation'
			in={isOpen}
			timeout={300}
			unmountOnExit
			nodeRef={modalRef}
		>
			<div
				className='modal-window'
				onClick={() => handlerActivation()}
				role='presentation'
				ref={modalRef}
			>
				<div
					className={classList('modal-window__container', {
						'modal-window__container--active': isOpen,
					})}
					onClick={(e: React.MouseEvent) => e.stopPropagation()}
					role='presentation'
				>
					{children}
				</div>
			</div>
		</CSSTransition>,
		document.getElementById('modal')!
	)
}
