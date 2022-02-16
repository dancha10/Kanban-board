export interface IBoardShortInfo {
	_id: string
	BID: string
	title: string
	background: string
}

export interface IBoard {
	_id: string
	BID: string
	title: string
	background: string
	owner: string
	users: Array<IUsers>
	columns: Array<IColumns>
}

export interface IUsers {
	_id: string
	avatar: string
	nickname: string
}

export interface IColumns {
	_id: string
	title: string
	cards: Array<ICards>
}

export interface ICards {
	_id: string
	title: string
	description: string
	coverURL: string
	borderColor: string
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
