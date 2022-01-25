import React from 'react'
import './style.scss'

interface BorderType {
	size?: string
}

export const Border: React.FC<BorderType> = ({ size = '415' }) => {
	return <div className='border' style={{ width: `${size}px` }} />
}
