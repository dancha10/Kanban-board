import { $api } from '../axios.config'
import { addError } from '../../store/Error/error.store'
import { IBoard, IBoardShortInfo } from '../../utils/types/board.type'

export const getAllBoard = async () => {
	try {
		const response = await $api.get<Array<IBoardShortInfo>>('/board/')
		return response.data
	} catch (e: any) {
		addError(e.response.data.message)
	}
}

export const getCurrentBoardById = async (id: string) => {
	try {
		const response = await $api.get<IBoard>(`/board/${id}`)
		return response.data
	} catch (e: any) {
		addError(e.response.data.message)
	}
}
