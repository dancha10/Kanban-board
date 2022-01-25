import { IAvatar } from '../../components/atoms/Avatar'

export interface IBoard {
	boards: Array<IBoardElements>
}

export interface IUsers {
	_id: string
	avatar: string
	nickname: string
}

export interface IBoardElements {
	_id: string
	title: string
	background: string
	owner: string
	users: Array<IUsers>
	cards: Array<any>
}
