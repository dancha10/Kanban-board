import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import { useStore } from 'effector-react'
import { useToasty } from '../../../hooks/toast.hook'
import { useOutside } from '../../../hooks/outside.hook'

import { Avatar } from '../../atoms/Avatar'

import { SCREENS } from '../../../routes/endpoints'

import './style.scss'
import { logoutClicked } from '../../../store/auth.store'
import { $isUserMenu, userMenuActivate, userMenuInactivate } from '../../../store/popup.store'

export const UserMenu: React.FC = () => {
	const IRef = useRef<HTMLInputElement>(null)
	const IRefTransition = useRef<HTMLDivElement>(null)

	const notification = useToasty()
	const navigate = useNavigate()

	// const { ref } = useOutside(userMenuActivate)

	const CopyHandler = () => {
		IRef?.current?.select()
		document.execCommand('copy')
		window.getSelection()!.removeAllRanges()
		notification('ID copied', 'success')
	}

	const isUserMenu = useStore($isUserMenu)

	return (
		<CSSTransition
			in={isUserMenu}
			classNames='menu-user'
			timeout={200}
			unmountOnExit
			nodeRef={IRefTransition}
		>
			<div className='user-menu' ref={IRefTransition}>
				<div className='user-menu__container'>
					<div className='user-menu__header'>
						<Avatar type='setting' nickname='Nickname' avatar={undefined} />
						<span className='user-menu__nickname'>Nick</span>
					</div>
					<div className='user-menu__body'>
						<div className='user-menu__id'>
							<label htmlFor='UID'>Your ID</label>
							<div className='user-menu__input-wrapper'>
								<input
									type='text'
									className='user-menu__input'
									value='#BrFSgF'
									id='UID'
									readOnly
									ref={IRef}
								/>
								<button className='user-menu__copy' onClick={CopyHandler} aria-label='Copy'>
									<svg
										width='18'
										height='18'
										viewBox='0 0 18 18'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M2.25 2.25V1.75H1.75V2.25H2.25ZM9.39645 10.1036C9.59171 10.2988 9.90829 10.2988 10.1036 10.1036C10.2988 9.90829 10.2988 9.59171 10.1036 9.39645L9.39645 10.1036ZM2.75 8.25V2.25H1.75V8.25H2.75ZM2.25 2.75H8.25V1.75H2.25V2.75ZM1.89645 2.60355L9.39645 10.1036L10.1036 9.39645L2.60355 1.89645L1.89645 2.60355Z'
											fill='#7990AA'
										/>
										<path
											d='M3 11.25V11.25C3 11.947 3 12.2955 3.05764 12.5853C3.29436 13.7753 4.22466 14.7056 5.41473 14.9424C5.70453 15 6.05302 15 6.75 15H9C11.8284 15 13.2426 15 14.1213 14.1213C15 13.2426 15 11.8284 15 9V6.75C15 6.05302 15 5.70453 14.9424 5.41473C14.7056 4.22466 13.7753 3.29436 12.5853 3.05764C12.2955 3 11.947 3 11.25 3V3'
											stroke='#7990AA'
											strokeLinecap='round'
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
					<div className='user-menu__footer'>
						<button
							className='user-menu__logout'
							onClick={() => {
								logoutClicked()
								navigate(SCREENS.SCREENS__LOGIN)
								userMenuInactivate()
							}}
						>
							<svg
								width='18'
								height='18'
								viewBox='0 0 18 18'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M6.51568 16.0543L6.69926 15.5892L6.51568 16.0543ZM5.51223 15.184L5.07779 15.4315L5.51223 15.184ZM15.0164 14.3637L14.6386 14.0361L15.0164 14.3637ZM15.0164 3.63628L14.6386 3.96388L15.0164 3.63628ZM8.98956 2.5393L10.5278 2.75905L10.6692 1.7691L9.13098 1.54935L8.98956 2.5393ZM15.25 8.20377V9.79623H16.25V8.20377H15.25ZM10.5278 15.2409L8.84262 15.4817L8.98404 16.4716L10.6692 16.2309L10.5278 15.2409ZM8.84262 15.4817C8.19885 15.5737 7.74774 15.6377 7.39534 15.6572C7.04791 15.6765 6.84895 15.6483 6.69926 15.5892L6.3321 16.5194C6.67515 16.6548 7.04004 16.6785 7.45077 16.6557C7.85653 16.6332 8.35787 16.5611 8.98404 16.4716L8.84262 15.4817ZM4.75 12.7995C4.75 13.432 4.74956 13.9385 4.78465 14.3434C4.82016 14.7532 4.89522 15.1111 5.07779 15.4315L5.94667 14.9365C5.86701 14.7967 5.81095 14.6037 5.78091 14.257C5.75044 13.9054 5.75 13.4498 5.75 12.7995H4.75ZM6.69926 15.5892C6.38136 15.4637 6.11585 15.2335 5.94667 14.9365L5.07779 15.4315C5.35975 15.9264 5.80227 16.3102 6.3321 16.5194L6.69926 15.5892ZM15.25 9.79623C15.25 11.0498 15.2491 11.9431 15.1622 12.6305C15.0772 13.304 14.916 13.7163 14.6386 14.0361L15.3941 14.6913C15.8503 14.1653 16.056 13.5344 16.1544 12.7558C16.2509 11.9912 16.25 11.0237 16.25 9.79623H15.25ZM10.6692 16.2309C11.8844 16.0573 12.8423 15.9214 13.5856 15.7177C14.3424 15.5102 14.9379 15.2174 15.3941 14.6913L14.6386 14.0361C14.3612 14.356 13.9759 14.5738 13.3212 14.7532C12.653 14.9364 11.7688 15.0637 10.5278 15.2409L10.6692 16.2309ZM10.5278 2.75905C11.7688 2.93633 12.653 3.06358 13.3212 3.24676C13.9758 3.42621 14.3612 3.64403 14.6386 3.96388L15.3941 3.30868C14.9379 2.78264 14.3424 2.48979 13.5856 2.28234C12.8423 2.0786 11.8844 1.9427 10.6692 1.7691L10.5278 2.75905ZM16.25 8.20377C16.25 6.97627 16.2509 6.00876 16.1544 5.24418C16.056 4.46562 15.8503 3.83472 15.3941 3.30868L14.6386 3.96388C14.916 4.28373 15.0772 4.69604 15.1622 5.3695C15.2491 6.05692 15.25 6.95021 15.25 8.20377H16.25ZM9.13098 1.54935C8.43719 1.45024 7.88175 1.37035 7.43358 1.34949C6.97944 1.32836 6.57749 1.36358 6.20538 1.53473L6.62323 2.44324C6.7864 2.3682 7.00387 2.33058 7.38711 2.34841C7.77632 2.36652 8.27622 2.43739 8.98956 2.5393L9.13098 1.54935ZM5.75 5.34895C5.75 4.62838 5.75054 4.12347 5.78765 3.73561C5.8242 3.3537 5.89219 3.14374 5.98956 2.99282L5.14927 2.45069C4.92722 2.79486 4.83551 3.18779 4.7922 3.64035C4.74946 4.08696 4.75 4.64812 4.75 5.34895H5.75ZM6.20538 1.53473C5.7734 1.7334 5.40704 2.05115 5.14927 2.45069L5.98956 2.99282C6.14422 2.7531 6.36404 2.56245 6.62323 2.44324L6.20538 1.53473Z'
									fill='#7990AA'
								/>
								<path
									d='M12 9L12.3904 8.68765L12.6403 9L12.3904 9.31235L12 9ZM3 9.5C2.72386 9.5 2.5 9.27614 2.5 9C2.5 8.72386 2.72386 8.5 3 8.5V9.5ZM9.39043 4.93765L12.3904 8.68765L11.6096 9.31235L8.60957 5.56235L9.39043 4.93765ZM12.3904 9.31235L9.39043 13.0623L8.60957 12.4377L11.6096 8.68765L12.3904 9.31235ZM12 9.5H3V8.5H12V9.5Z'
									fill='#7990AA'
								/>
							</svg>
							<span>Log out</span>
						</button>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}
