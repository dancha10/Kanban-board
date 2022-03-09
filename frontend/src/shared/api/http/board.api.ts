import { IBoard, IBoardShortInfo, IResponseMessage } from 'shared/lib'

import { $api } from '../base'

export const getAllBoard = async (): Promise<Array<IBoardShortInfo>> => {
	const response = await $api.get<Array<IBoardShortInfo>>('/board/')
	return response.data
}

export const getCurrentBoardById = async (id: string): Promise<IBoard> => {
	const response = await $api.get<IBoard>(`/board/${id}`)
	return response.data
}

export const boardCreate = async (title: string): Promise<string> => {
	const response = await $api.post<IResponseMessage>('/board/create', { title })
	return response.data.message
}
