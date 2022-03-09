import { BorderType, ColorType } from './shared'

export interface IBoardShortInfo extends ColorType {
	_id: string
	BID: string
	title: string
}

export interface IBoard extends ColorType {
	_id: string
	BID: string
	title: string
	owner: string
	users: Array<IUsers>
	columns: Array<IColumns>
}

export interface IUsers {
	_id: string
	avatarURL: string
	nickname: string
}

export interface IColumns {
	_id: string
	title: string
	cards: Array<ICards>
}

export interface ICards extends BorderType {
	_id: string
	title: string
	description: string
	coverURL: string
	attachment: Array<IFile>
	time: {
		start: number
		end: number
		isCompleted: boolean
	}
}

export interface IFile {
	_id: string
	fileName: string
	url: string
	size: number
}
