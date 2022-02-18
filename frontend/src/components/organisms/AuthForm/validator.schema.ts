import * as yup from 'yup'

export const authSchema = yup
	.object({
		email: yup
			.string()
			.min(4, 'Minimum email length 4 characters')
			.max(30, 'Minimum email length 30 characters')
			.email('Email entered incorrectly')
			.required('This field is required'),
		password: yup
			.string()
			.min(4, 'Minimum password length 4 characters')
			.required('This field is required'),
	})
	.required('This field is required')
