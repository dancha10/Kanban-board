export interface IBoard {
	boards: Array<IBoardElements>
}

export interface IBoardElements {
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
	ColumnTitle: string
	cards: Array<any>
}
