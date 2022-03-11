import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'effector-react'

import { ModalCreateBoard, ModalCreateCard, ModalCreateColumn } from 'widgets/modals'
import { Column } from 'widgets/column'
import { CreateColumn } from 'features/create-column'
import { Loader } from 'shared/ui/loader'
import { ColorPalette } from 'features/color-palette'

import { urlRedirected, $currentBoard, getCurrentBoardFx } from './model'

import './style.scss'

const BoardPage: React.FC = () => {
	const { id } = useParams()
	useEffect(() => {
		urlRedirected(id!)
	}, [id])

	const board = useStore($currentBoard)
	const isLoading = useStore(getCurrentBoardFx.pending)

	if (isLoading) return <Loader isFull={false} />

	return (
		<div className='current-board'>
			<div className='current-board__header'>
				<ColorPalette />
				<h2 className='current-board__title'>{board.title}</h2>
			</div>
			<div className='current-board__content'>
				{board &&
					board.columns.map(column => (
						<Column
							_id={column._id}
							title={column.title}
							cards={column.cards}
							key={column._id}
						/>
					))}
				<CreateColumn />
			</div>
			<ModalCreateBoard />
			<ModalCreateColumn />
			<ModalCreateCard />
		</div>
	)
}

export default BoardPage
