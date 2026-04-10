interface OfferCardProps {
	id: string
	period: string
	price: number
	fullPrice: number
	isBest: boolean
	text: string
	selected: boolean
	onClick: React.MouseEventHandler<HTMLDivElement>
	expired: boolean
}

const OfferCard = (props: OfferCardProps) => {
	const {id, period, price, fullPrice, isBest, text, selected, onClick, expired} = props

	return (
		<>
		{isBest && (
			<div onClick={onClick} className={`sm:h-[190px] h-fit sm:w-[748px] w-[100%] relative flex sm:gap-[40px] gap-[30px] items-center bg-[#313637] rounded-[40px] ${selected ? 'border-[#fdb056]' : 'border-[#484d4e]'} border-[2px] sm:pr-[80px] pr-[16px] sm:pl-[120px] pl-[30px] sm:pt-[34px] pt-[20px] sm:pb-[30px] pb-[20px] cursor-pointer`}>
				<div className={`${expired ? 'hidden' : 'absolute'} top-0 sm:left-[50px] sm:right-0 right-[62px] flex items-center justify-center sm:w-[70px] w-[48px] sm:h-[40px] h-[27px] bg-[#fd5656] rounded-b-[8px]`}>
					<p className="sm:text-[22px] text-[16px]">{'-' + Math.floor((fullPrice - price) / fullPrice * 100) + '%'}</p>
				</div>

				<p className="absolute top-[10px] right-[20px] sm:text-[22px] text-[16px] leading-[130%] text-[#fdb056]">хит!</p>

				<div className="flex flex-col sm:items-center items-start justify-center">
					<p className="sm:text-[26px] text-[18px] leading-[120%]">{period}</p>
					<div className="flex flex-col gap-0 mt-[16px]">
						{!expired && (
							<h1 className="sm:text-[50px] text-[34px] leading-[100%] text-nowrap text-[#fdb056] font-semibold">{price + ' ₽'}</h1>
						)}
						{expired && (
							<h1 className="sm:text-[50px] text-[34px] leading-[100%] text-nowrap text-[#fdb056] font-semibold">{fullPrice + ' ₽'}</h1>
						)}
						<p className={`${expired ? 'hidden' : 'block'} sm:text-[24px] text-[16px] leading-[120%] text-[#919191] line-through self-end`}>{fullPrice + ' ₽'}</p>
					</div>
				</div>
				<p className="sm:text-[16px] text-[14px] leading-[130%]">{text}</p>
			</div>
		)}
		
		{!isBest && (
			<div onClick={onClick} className={`sm:h-[335px] h-fit sm:w-[240px] w-[100%] relative flex sm:flex-col sm:gap-0 gap-[30px] flex-row items-center bg-[#313637] rounded-[40px] ${selected ? 'border-[#fdb056]' : 'border-[#484d4e]'} border-[2px] sm:pl-[21px] pl-[30px] sm:pr-[21px] pr-[16px] sm:pb-[26px] pb-[20px] sm:pt-[70px] pt-[20px] cursor-pointer`}>
				<div className={`${expired ? 'hidden' : 'absolute'} top-0 sm:left-[50px] sm:right-0 right-[62px] flex items-center justify-center sm:w-[70px] w-[48px] sm:h-[40px] h-[27px] bg-[#fd5656] rounded-b-[8px]`}>
					<p className="sm:text-[22px] text-[16px]">{'-' + Math.floor((fullPrice - price) / fullPrice * 100) + '%'}</p>
				</div>

				<div className="flex flex-col sm:items-center items-start">
					<p className="sm:text-[26px] text-[18px] leading-[120%]">{period}</p>
					<div className="flex flex-col gap-0 sm:mt-[30px] mt-[16px]">
						{!expired && (
							<h1 className="sm:text-[50px] text-[34px] leading-[100%] font-semibold">{price + ' ₽'}</h1>
						)}
						{expired && (
							<h1 className="sm:text-[50px] text-[34px] leading-[100%] font-semibold">{fullPrice + ' ₽'}</h1>
						)}
						<p className={`${expired ? 'hidden' : 'block'} sm:text-[24px] text-[16px] leading-[120%] text-[#919191] line-through self-end`}>{fullPrice + ' ₽'}</p>
					</div>
				</div>
				<p className="sm:mt-[50px] sm:text-[16px] text-[14px] leading-[130%] sm:self-start">{text}</p>
			</div>
		)}
		</>
	)
}

export default OfferCard