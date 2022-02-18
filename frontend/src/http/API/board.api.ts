import { $api } from '../axios.config'
import { IBoard, IBoardShortInfo } from '../../utils/types/board.type'

export const getAllBoard = async () => {
	const response = await $api.get<Array<IBoardShortInfo>>('/board/')
	return response.data
}

export const getCurrentBoardById = async (id: string) => {
	const response = await $api.get<IBoard>(`/board/${id}`)
	return response.data
}
