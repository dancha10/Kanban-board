import { $api } from '../axios.config'
import { IBoard, IBoardShortInfo } from '../../utils/types/board.type'
import { IResponseMessage } from '../../utils/types/response.type'

export const getAllBoard = async () => {
	const response = await $api.get<Array<IBoardShortInfo>>('/board/')
	return response.data
}

export const getCurrentBoardById = async (id: string) => {
	const response = await $api.get<IBoard>(`/board/${id}`)
	return response.data
}

export const boardCreate = async (title: string) => {
	const response = await $api.post<IResponseMessage>('/board/create', { title })
	return response.data.message
}
