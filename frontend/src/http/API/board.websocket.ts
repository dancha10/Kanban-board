import { io, Socket } from 'socket.io-client'
import { IBoard } from '../../utils/types/board.type'

// From socket-io types
export interface DefaultEventsMap {
	[event: string]: (...args: any[]) => void
}

let socket: Socket<DefaultEventsMap, DefaultEventsMap>

export const createChannel2 = () => {
	socket = io('ws://localhost:228', {
		withCredentials: true,
		transports: ['websocket'],
	})
	socket.on('connect', () => {
		console.log('connect: ', socket.id)
	})
}

export const disconnectWS2 = () => {
	socket.on('disconnect', () => {
		console.log('disconnect: ', socket.id)
	})
}

// location.pathname.split('/b/')[1]
export const sendCurrentId2 = (id: string) => {
	socket.emit('getBoardById', id)
}

export const getCurrentBoardById2 = () => {
	const array: IBoard[] = [
		{
			_id: '',
			BID: '',
			title: 'string',
			background: 'string',
			owner: 'string',
			users: [],
			columns: [],
		},
	]
	socket.on('getBoardById', (data: IBoard) => {
		array[0] = data
	})
	return array
}
