import React from 'react'
import './style.scss'
import { BlueInput, IBlueInput } from '../BlueInput'

interface FormFieldType extends IBlueInput {
	label: string
	htmlFor?: string
}

export const FormField: React.FC<FormFieldType> = ({
	type,
	placeholder,
	isError,
	id,
	register,
	label,
	htmlFor = id,
}) => (
	<>
		<label htmlFor={htmlFor}>{label}</label>
		<BlueInput
			placeholder={placeholder}
			id={id}
			isError={isError}
			type={type}
			register={register}
		/>
	</>
)
