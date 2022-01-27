import React, { useRef, useState, useMemo } from 'react'
import { useRequest } from './request.hook'
import { useToasty } from './toast.hook'

import { OpacityInput } from '../components/atoms/OpacityInput'
import { MainButton } from '../components/atoms/MainButton'
import { ModalWindow } from '../components/atoms/ModalWindow'
import { BlueInput } from '../components/atoms/BlueInput'

export const useModal = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { request } = useRequest()
	const notification = useToasty()

	// list modals
	const [isModalCreateBoard, setModalCreateBoard] = useState(false)
	const [isModalInvite, setModalInvite] = useState(false)

	// Modal Create Board
	const CreateBoardHandler = async () => {
		try {
			const data = await request(
				'/api/board/create',
				'POST',
				{ title: inputRef?.current?.value },
				{},
				true
			)
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
			const data = await request(
				'/board/invite',
				'POST',
				{ generationID: inputRef?.current?.value },
				{},
				true
			)
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
					<BlueInput placeholder='Enter identifier' inputRef={inputRef} />
					<MainButton text='Invite' onClick={InviteHandler} />
				</div>
			</ModalWindow>
		)
	}, [isModalInvite, setModalInvite])

	return { ModalCreateBoard, setModalCreateBoard, ModalInvite, setModalInvite }
}
