import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useStore } from 'effector-react'

import { CreateCardModel } from 'features/create-card'
import { ColorPalette, ColorPaletteChoose, ColorPaletteModel } from 'features/color-palette'
import { ModalWindow } from 'shared/ui/modal-window'

import './style.scss'

export const ModalCreateCard = () => {
	const isOpen = useStore(CreateCardModel.$isActive)
	const isColorChoose = useStore(ColorPaletteModel.$isColorPalette)

	const colorPaletteRef = useRef<HTMLDivElement>(null) // for CCSTransition Color Palette

	return (
		<ModalWindow isOpen={isOpen} handlerActivation={CreateCardModel.changedActivation}>
			<div className='modal-card'>
				<ul className='modal-card__navbar'>
					<li className='modal-card__navbar-feature'>
						<ColorPalette />
					</li>
				</ul>
				<CSSTransition
					in={isColorChoose}
					timeout={400}
					classNames='color-choose'
					unmountOnExit
					nodeRef={colorPaletteRef}
				>
					<ColorPaletteChoose nodeRef={colorPaletteRef} />
				</CSSTransition>
			</div>
		</ModalWindow>
	)
}
