'use client'

import Timer from "./Timer"

interface HeaderProps {
	noTimeLeft: () => void
}

const Header = (props: HeaderProps) => {
	return (
		<header className="fixed top-0 right-0 left-0 flex flex-col justify-center items-center bg-[#1d5b43] z-1">
			<p className="sm:text-[24px] text-[18px] font-semibold">Успейте открыть пробную неделю</p>
			<Timer noTimeLeft={props.noTimeLeft} initialSecondsLeft={120}/>
		</header>
	)
}

export default Header