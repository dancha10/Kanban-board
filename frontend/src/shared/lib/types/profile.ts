import { IUsers } from 'shared/lib/types/board'

export interface IUserInfo extends Omit<IUsers, '_id'> {
	UID: string
	email: string
}
