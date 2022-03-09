import * as yup from 'yup'

export interface IAuthValidator {
	email: string
	password: string
}

export const signInSchema = yup
	.object({
		email: yup
			.string()
			.min(4, 'Minimum email length 4 characters')
			.email('Email entered incorrectly')
			.required('This field is required'),
		password: yup
			.string()
			.min(4, 'Minimum password length 4 characters')
			.max(40, 'Max password length 40 characters')
			.required('This field is required'),
	})
	.required('This field is required')
