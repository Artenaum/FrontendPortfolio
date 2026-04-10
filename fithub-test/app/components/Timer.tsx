import { useEffect, useState } from "react"
import '../styles/Timer.css'

interface TimerProps {
	initialSecondsLeft: number
	noTimeLeft: () => void
}

const Timer = (props: TimerProps) => {
	const formatTime = (seconds: number): string => {
		const formattedMinutes = Math.floor((seconds % 3600) / 60)
		const formattedSeconds = Math.floor(seconds % 60)

		const displayedMinutes = formattedMinutes < 10 ? '0' + formattedMinutes : formattedMinutes
		const displayedSeconds = formattedSeconds < 10 ? '0' + formattedSeconds : formattedSeconds

		const formattedTime = String(displayedMinutes) + ':' + String(displayedSeconds)

		return formattedTime
	}

	const [secondsLeft, setSecondsLeft] = useState(props.initialSecondsLeft)
	const [formattedTimeLeft, setFormattedTimeLeft] = useState(formatTime(props.initialSecondsLeft))
	const [isRunning, setIsRunning] = useState(true)
	const [isAlmostOut, setIsAlmostOut] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			if (secondsLeft === 0) {
				setIsRunning(false)
				props.noTimeLeft()
			} else if (secondsLeft <= 30) {
				setIsAlmostOut(true)
			}

			if (isRunning) {
				setSecondsLeft((currentSecondsLeft: number) => currentSecondsLeft - 1)
				setFormattedTimeLeft(formatTime(secondsLeft))
			}
		}, 1000)

		return () => clearInterval(interval)
	})

	return (
		<>
			{!isAlmostOut && (
				<div className="flex gap-[8px] items-center">
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.99781 0.463683C5.22659 -0.154582 6.10105 -0.15458 6.32983 0.463685L7.44113 3.46694C7.51306 3.66132 7.66632 3.81458 7.8607 3.8865L10.864 4.99781C11.4822 5.22659 11.4822 6.10105 10.864 6.32983L7.8607 7.44113C7.66632 7.51306 7.51306 7.66632 7.44113 7.8607L6.32983 10.864C6.10105 11.4822 5.22659 11.4822 4.99781 10.864L3.8865 7.8607C3.81458 7.66632 3.66132 7.51306 3.46694 7.44113L0.463683 6.32983C-0.154582 6.10105 -0.15458 5.22659 0.463685 4.99781L3.46694 3.8865C3.66132 3.81458 3.81458 3.66132 3.8865 3.46694L4.99781 0.463683Z" fill="white"/>
					</svg>

					<h1 className="sm:text-[40px] text-[32px] font-bold">{formattedTimeLeft}</h1>

					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.99781 0.463683C5.22659 -0.154582 6.10105 -0.15458 6.32983 0.463685L7.44113 3.46694C7.51306 3.66132 7.66632 3.81458 7.8607 3.8865L10.864 4.99781C11.4822 5.22659 11.4822 6.10105 10.864 6.32983L7.8607 7.44113C7.66632 7.51306 7.51306 7.66632 7.44113 7.8607L6.32983 10.864C6.10105 11.4822 5.22659 11.4822 4.99781 10.864L3.8865 7.8607C3.81458 7.66632 3.66132 7.51306 3.46694 7.44113L0.463683 6.32983C-0.154582 6.10105 -0.15458 5.22659 0.463685 4.99781L3.46694 3.8865C3.66132 3.81458 3.81458 3.66132 3.8865 3.46694L4.99781 0.463683Z" fill="white"/>
					</svg>
				</div>
				
			)}

			{isAlmostOut && isRunning && (
				<div className="flex gap-[8px] items-center animate-[blink_1s_ease-in-out_infinite]">
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.99781 0.463683C5.22659 -0.154582 6.10105 -0.15458 6.32983 0.463685L7.44113 3.46694C7.51306 3.66132 7.66632 3.81458 7.8607 3.8865L10.864 4.99781C11.4822 5.22659 11.4822 6.10105 10.864 6.32983L7.8607 7.44113C7.66632 7.51306 7.51306 7.66632 7.44113 7.8607L6.32983 10.864C6.10105 11.4822 5.22659 11.4822 4.99781 10.864L3.8865 7.8607C3.81458 7.66632 3.66132 7.51306 3.46694 7.44113L0.463683 6.32983C-0.154582 6.10105 -0.15458 5.22659 0.463685 4.99781L3.46694 3.8865C3.66132 3.81458 3.81458 3.66132 3.8865 3.46694L4.99781 0.463683Z" fill="#FF4E4E"/>
					</svg>

					<h1 className="sm:text-[40px] text-[32px] font-bold text-[#ff4e4e]">{formattedTimeLeft}</h1>
					
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.99781 0.463683C5.22659 -0.154582 6.10105 -0.15458 6.32983 0.463685L7.44113 3.46694C7.51306 3.66132 7.66632 3.81458 7.8607 3.8865L10.864 4.99781C11.4822 5.22659 11.4822 6.10105 10.864 6.32983L7.8607 7.44113C7.66632 7.51306 7.51306 7.66632 7.44113 7.8607L6.32983 10.864C6.10105 11.4822 5.22659 11.4822 4.99781 10.864L3.8865 7.8607C3.81458 7.66632 3.66132 7.51306 3.46694 7.44113L0.463683 6.32983C-0.154582 6.10105 -0.15458 5.22659 0.463685 4.99781L3.46694 3.8865C3.66132 3.81458 3.81458 3.66132 3.8865 3.46694L4.99781 0.463683Z" fill="#FF4E4E"/>
					</svg>
				</div>
			)}

			{isAlmostOut && !isRunning && (
				<div className="flex gap-[8px] items-center animate-[blink_1s_ease-in-out_1]">
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.99781 0.463683C5.22659 -0.154582 6.10105 -0.15458 6.32983 0.463685L7.44113 3.46694C7.51306 3.66132 7.66632 3.81458 7.8607 3.8865L10.864 4.99781C11.4822 5.22659 11.4822 6.10105 10.864 6.32983L7.8607 7.44113C7.66632 7.51306 7.51306 7.66632 7.44113 7.8607L6.32983 10.864C6.10105 11.4822 5.22659 11.4822 4.99781 10.864L3.8865 7.8607C3.81458 7.66632 3.66132 7.51306 3.46694 7.44113L0.463683 6.32983C-0.154582 6.10105 -0.15458 5.22659 0.463685 4.99781L3.46694 3.8865C3.66132 3.81458 3.81458 3.66132 3.8865 3.46694L4.99781 0.463683Z" fill="#FF4E4E"/>
					</svg>

					<h1 className="sm:text-[40px] text-[32px] font-bold text-[#ff4e4e]">{formattedTimeLeft}</h1>
					
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.99781 0.463683C5.22659 -0.154582 6.10105 -0.15458 6.32983 0.463685L7.44113 3.46694C7.51306 3.66132 7.66632 3.81458 7.8607 3.8865L10.864 4.99781C11.4822 5.22659 11.4822 6.10105 10.864 6.32983L7.8607 7.44113C7.66632 7.51306 7.51306 7.66632 7.44113 7.8607L6.32983 10.864C6.10105 11.4822 5.22659 11.4822 4.99781 10.864L3.8865 7.8607C3.81458 7.66632 3.66132 7.51306 3.46694 7.44113L0.463683 6.32983C-0.154582 6.10105 -0.15458 5.22659 0.463685 4.99781L3.46694 3.8865C3.66132 3.81458 3.81458 3.66132 3.8865 3.46694L4.99781 0.463683Z" fill="#FF4E4E"/>
					</svg>
				</div>
			)}
		</>
	)
}

export default Timer