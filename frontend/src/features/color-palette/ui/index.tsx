import React from 'react'
import { useStore } from 'effector-react'

import { $isCheckedColor, changedCheckedColor, switchedColorPalette } from '../model/model'
import { ReactComponent as ColorPaletteSvg } from '../lib/color-palette.svg'
import { ReactComponent as Check } from '../lib/check.svg'

import './style.scss'

interface IColorPaletteChoose {
	nodeRef: React.LegacyRef<HTMLDivElement> | undefined
}

export const ColorPalette = () => {
	return (
		<button className='task-button' title='Set stroke' onClick={() => switchedColorPalette()}>
			<ColorPaletteSvg />
		</button>
	)
}

export const ColorPaletteChoose: React.FC<IColorPaletteChoose> = ({ nodeRef }) => {
	const isChecked = useStore($isCheckedColor)
	return (
		<div className='color-field' ref={nodeRef}>
			<p className='color-field__title'>Color</p>
			<div className='color-field__color-variables'>
				<button
					id='red'
					type='button'
					className='color-field__color-circle red'
					onClick={event => changedCheckedColor(event.currentTarget.id)}
				>
					{isChecked === 'red' && <Check />}
				</button>
				<button
					id='orange'
					type='button'
					className='color-field__color-circle orange'
					onClick={event => changedCheckedColor(event.currentTarget.id)}
				>
					{isChecked === 'orange' && <Check />}
				</button>
				<button
					id='yellow'
					type='button'
					className='color-field__color-circle yellow'
					onClick={event => changedCheckedColor(event.currentTarget.id)}
				>
					{isChecked === 'yellow' && <Check />}
				</button>
				<button
					id='green'
					type='button'
					className='color-field__color-circle green'
					onClick={event => changedCheckedColor(event.currentTarget.id)}
				>
					{isChecked === 'green' && <Check />}
				</button>
				<button
					id='blue'
					type='button'
					className='color-field__color-circle blue'
					onClick={event => changedCheckedColor(event.currentTarget.id)}
				>
					{isChecked === 'blue' && <Check />}
				</button>
				<button
					id='purple'
					type='button'
					className='color-field__color-circle purple'
					onClick={event => changedCheckedColor(event.currentTarget.id)}
				>
					{isChecked === 'purple' && <Check />}
				</button>
			</div>
		</div>
	)
}
