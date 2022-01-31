import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'

interface ITimer {
	time: Array<number>
}

export const Timer: React.FC<ITimer> = ({ time }) => {
	const [isHover, setHover] = useState(false)
	const [isCompleted, setCompleted] = useState(false)
	const [status, setStatus] = useState<'blue' | 'red' | 'yellow'>('blue')

	const hour = 1000 * 60 * 60

	const dateStart = new Date(time[0])
	const dateEnd = new Date(time[1])

	const TimeHandler = useCallback(() => {
		const dateMilliseconds = dateStart.getTime() - new Date().getTime()
		if (dateMilliseconds <= 6 * hour) {
			return setStatus('red')
		}
		if (dateMilliseconds > 6 * hour && dateMilliseconds < 24 * hour) {
			return setStatus('yellow')
		}
		setStatus('blue')
	}, [setStatus])

	useEffect(() => {
		if (!isCompleted) {
			const intervalID = setInterval(TimeHandler, hour)
			if (dateEnd.getTime() - new Date().getTime() < hour || status === 'red') {
				setStatus('red')
				clearInterval(intervalID)
			}
		}
	}, [isCompleted])

	return (
		<div
			className={`timer ${isCompleted ? 'timer--completed' : status}`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => !isCompleted && setHover(false)}
		>
			<div className='timer__content'>
				<div className='timer__clock'>
					{isHover ? (
						<>
							<input
								type='checkbox'
								className='timer__checkbox'
								id='checkbox'
								name='timer-check'
								onChange={e =>
									e.target.checked ? setCompleted(true) : setCompleted(false)
								}
							/>
							<label htmlFor='checkbox'>&#0;</label>
						</>
					) : (
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle cx='12' cy='13' r='7' stroke='white' />
							<path d='M5 5L3 7' stroke='white' strokeLinecap='round' />
							<path d='M19 5L21 7' stroke='white' strokeLinecap='round' />
							<path
								d='M9 11L11.8093 12.8729C11.9172 12.9448 12.0622 12.9223 12.1432 12.821L14 10.5'
								stroke='white'
								strokeLinecap='round'
							/>
						</svg>
					)}
				</div>
				<div className='timer__time'>
					{dateStart.getFullYear() === dateEnd.getFullYear()
						? `${dateStart.getDate()} ${
								dateStart.toDateString().split(' ')[1]
						  } - ${dateEnd.getDate()} ${dateEnd.toDateString().split(' ')[1]}`
						: `${dateStart.getDate()} ${
								dateStart.toDateString().split(' ')[1]
						  } ${dateStart.getFullYear()} - ${dateEnd.getDate()} ${
								dateEnd.toDateString().split(' ')[1]
						  } ${dateEnd.getFullYear()}`}
				</div>
			</div>
		</div>
	)
}
