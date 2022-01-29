import React, { useState, useEffect, useRef } from 'react'

export const useOutside = (handler: (bool: boolean) => void, initialValue: boolean = true) => {
	const [isVisible, setVisible] = useState(initialValue)
	const ref = useRef<HTMLDivElement>(null)

	const HandlerKeyPress = (event: any) => {
		if (event.key === 'Escape') {
			setVisible(false)
			handler(!initialValue)
		}
	}
	const HandleOutside = (event: Event) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setVisible(false)
			handler(!initialValue)
		}
	}
	useEffect(() => {
		document.addEventListener('keydown', HandlerKeyPress, true)
		document.addEventListener('click', HandleOutside, true)
		return () => {
			document.removeEventListener('keydown', HandlerKeyPress, true)
			document.removeEventListener('click', HandleOutside, true)
		}
	})
	return { ref, isVisible, setVisible }
}
