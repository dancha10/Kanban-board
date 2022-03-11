import { $api } from 'shared/api/base'
import { IResponseMessage, IResponseSuccess } from 'shared/lib'

const API_TAG = '/card/'

export const createCard = async (columnID: string) => {
	const response = await $api.post<IResponseSuccess>(`${API_TAG}create`, { columnID })
	return response.data.success
}

export const setBorderColor = async (cardID: string, borderColor: string): Promise<string> => {
	const response = await $api.post<IResponseMessage>(`${API_TAG}border`, { cardID, borderColor })
	return response.data.message
}
