import React from 'react'

export const AuthContext = React.createContext({
	token: '',
	isAuthenticated: false,
	login: (jwtToken: string) => {},
	logout: () => {},
	refresh: () => new Promise(() => {}),
})
