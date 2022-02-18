import React, { useRef, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useRequest } from './request.hook'
import { useNotification } from './notification.hook'

import { OpacityInput } from '../components/atoms/OpacityInput'
import { MainButton } from '../components/atoms/MainButton'
import { ModalWindow } from '../components/atoms/ModalWindow'
import { $api } from '../http/axios.config'

export const useModal = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { request } = useRequest()
	const notification = useNotification()
	const location = useLocation()

	// list modals
	const [isModalCreateBoard, setModalCreateBoard] = useState(false)
	const [isModalInvite, setModalInvite] = useState(false)
	const [isModalCreateColumn, setModalCreateColumn] = useState(false)

	// Modal Create Board
	const CreateBoardHandler = async () => {
		try {
			const data = $api.post('/board/create', { title: inputRef?.current?.value })
			console.log(data)
			inputRef!.current!.value = ''
			setModalCreateBoard(false)
		} catch (err) {
			if (err instanceof Error) notification(err.message)
		}
	}

	const ModalCreateBoard = useMemo(() => {
		return (
			<ModalWindow
				modalActive={isModalCreateBoard}
				setModalActive={setModalCreateBoard}
				isButtonClose
			>
				<div className='modal-wrapper' role='menu'>
					<h3>Create new board</h3>
					<OpacityInput maxLength={20} placeholder='Enter title board' inputRef={inputRef} />
					<MainButton text='Create' onClick={CreateBoardHandler} />
				</div>
			</ModalWindow>
		)
	}, [isModalCreateBoard, setModalCreateBoard])

	// Modal Invite
	const InviteHandler = async () => {
		try {
			console.log(inputRef?.current?.value)
			const data = await request(
				'/api/board/invite',
				'POST',
				{ generationID: inputRef?.current?.value },
				{},
				true
			)
			inputRef!.current!.value = ''
			setModalInvite(false)
			console.log(data)
		} catch (err) {
			if (err instanceof Error) notification(err.message)
		}
	}

	const ModalInvite = useMemo(() => {
		return (
			<ModalWindow modalActive={isModalInvite} setModalActive={setModalInvite} isButtonClose>
				<div className='modal-wrapper' role='menu'>
					<h3>Invite friend</h3>
					<OpacityInput maxLength={6} placeholder='Enter identifier' inputRef={inputRef} />
					<MainButton text='Invite' onClick={InviteHandler} />
				</div>
			</ModalWindow>
		)
	}, [isModalInvite, setModalInvite])

	// Modal create column

	const CreateColumnHandler = async () => {
		try {
			const data = await request(
				'/api/column/create',
				'POST',
				{ BID: location.pathname.split('/b/')[1], title: inputRef?.current?.value },
				{},
				true
			)
			inputRef!.current!.value = ''
			setModalCreateColumn(false)
			console.log(data)
		} catch (err) {
			if (err instanceof Error) notification(err.message)
		}
	}

	const ModalCreateColumn = useMemo(() => {
		return (
			<ModalWindow
				modalActive={isModalCreateColumn}
				setModalActive={setModalCreateColumn}
				isButtonClose
			>
				<div className='modal-wrapper' role='menu'>
					<h3>Create new column</h3>
					<OpacityInput maxLength={25} placeholder='Enter title column' inputRef={inputRef} />
					<MainButton text='Create' onClick={CreateColumnHandler} />
				</div>
			</ModalWindow>
		)
	}, [isModalCreateColumn, setModalCreateColumn])

	return {
		ModalCreateBoard,
		setModalCreateBoard,
		ModalInvite,
		setModalInvite,
		ModalCreateColumn,
		setModalCreateColumn,
	}
}
