import { IResponseMessage } from 'shared/lib'

import { $api } from '../base'

const API_TAG = '/column/'

export const createColumn = async (BID: string, title: string): Promise<string> => {
	const response = await $api.post<IResponseMessage>(`${API_TAG}create`, { BID, title })
	return response.data.message
}

export const changeColumnTitle = async (id: string, title: string): Promise<string> => {
	const response = await $api.put<IResponseMessage>(`${API_TAG}change/${id}`, { title })
	return response.data.message
}

export const deleteColumn = async (id: string): Promise<string> => {
	const response = await $api.delete<IResponseMessage>(`${API_TAG}change/${id}`)
	return response.data.message
}
