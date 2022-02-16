export interface IBoards {
	boards: Array<IBoard>
}

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
	_id?: string
	title: string
	cards: Array<ICards>
}

export interface ICards {
	_id: string
	task: string
	description: string
	cover: string
	border: string
	files: Array<any>
	time: {
		start: number
		end: number
		isCompleted: boolean
	}
}
