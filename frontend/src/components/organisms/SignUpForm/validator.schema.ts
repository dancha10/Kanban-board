import * as yup from 'yup'

export const SignUpschema = yup
	.object({
		email: yup
			.string()
			.min(4, 'Minimum email length 4 characters')
			.max(30, 'Maximum email length 4 characters')
			.email('Email entered incorrectly')
			.required(),
		nickname: yup
			.string()
			.min(3, 'Minimum nickname length 3 characters')
			.max(20, 'Maximum nickname length 20 characters')
			.required('This field is required'),
		password: yup
			.string()
			.min(4, 'Minimum password length 3 characters')
			.required('This field is required'),
		passwordConfirm: yup
			.string()
			.min(4, 'Minimum password length 3 characters')
			.required('This field is required'),
	})
	.required('This field is required')
