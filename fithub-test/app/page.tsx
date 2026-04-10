/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import Image from "next/image";
import Header from "./components/Header";
import ManImage from '../public/man.png'
import OfferCard from "./components/OfferCard";
import Checkbox from "./components/Checkbox";
import { useEffect, useState } from "react";
import { Offer } from "./types/Offer";

export default function Home() {
	const [isAgreed, setIsAgreed] = useState(false)
	const [showError, setShowError] = useState(false)

	const [offers, setOffers] = useState<Offer[]>([])
	const [nonBestOffers, setNonBestOffers] = useState<Offer[]>([])
	const [bestOffer, setBestOffer] = useState<Offer>()
	const [selectedOffer, setSelectedOffer] = useState('')

	const [isPriceExpired, setIsPriceExpired] = useState(false)

	const handleSubmit = () => {
		if (!isAgreed) {
			setShowError(true)
		} else {
			setShowError(false)
		}
	}

	const selectOffer = (id: string) => {
		setSelectedOffer(id)
	}

	useEffect(() => {
		fetch('https://t-core.fit-hub.pro/Test/GetTariffs')
			.then(response => response.json())
			.then(data => setOffers(data))
	}, [])

	useEffect(() => {
		const bestOffer = offers.find(offer => offer.is_best)
		
		if (bestOffer) {
			setNonBestOffers(offers.filter(offer => offer.id !== bestOffer.id))
			setBestOffer(bestOffer)
			setSelectedOffer(bestOffer.id)
		}

		console.log(offers)
	}, [offers])

	const expirePrice = () => {
		setIsPriceExpired(true)
	}

	return (
		<div className="h-fit w-[100vw] flex flex-col items-center">
			<Header noTimeLeft={expirePrice}/>
			<div className="relative sm:top-[150px] top-[100px] pl-[16px] pr-[16px] sm:pb-[150px] pb-[30px] flex flex-col sm:w-[80%] w-[100%]">
				<h1 className="sm:text-[40px] text-[22px] leading-[110%] font-bold">Выбери подходящий для себя <span className="text-[#fdb056]">тариф</span></h1>
				<div className="h-[100%] flex sm:flex-row flex-col sm:gap-[87px] gap-0 sm:mt-[110px] mt-[20px] items-center">
					<div className="relative">
						<Image className="2xl:h-[767px] 2xl:min-h-[767px] xl:min-h-[600px] lg:min-h-[500px] md:min-h-[300px] h-[250px] min-h-[250px] 2xl:w-[380px] 2xl:min-w-[380px] xl:min-w-[300px] lg:min-w-[250px] md:min-w-[150px] w-[124px] min-w-[124px]" src={ManImage} alt="Man"/>
						<div className="absolute bottom-0 w-[100%] h-[10%] bg-linear-to-b from-transparent to-[#232829]"/>
					</div>
					<div className="w-fit flex flex-col gap-[14px] sm:items-start items-center">
						{/*<OfferCard id="" period="Навсегда" price={5990} fullPrice={18990} isBest={true} text="Для тех, кто хочет всегда быть в форме и поддерживать здоровье" selected={true}/>
						<div className="flex gap-[14px] mt-[14px]">
						<OfferCard id="" period="3 месяца" price={1990} fullPrice={3990} isBest={false} text="Привести тело в порядок" selected={false}/>
						<OfferCard id="" period="1 месяц" price={990} fullPrice={1690} isBest={false} text="Чтобы получить первые результаты" selected={false}/>
						<OfferCard id="" period="1 неделя" price={690} fullPrice={990} isBest={false} text="Чтобы просто начать" selected={false}/>
						</div>*/}

						{bestOffer && (
							<OfferCard
								key={bestOffer.id}
								id={bestOffer.id}
								period={bestOffer.period}
								price={bestOffer.price}
								fullPrice={bestOffer.full_price}
								isBest={true}
								text={bestOffer.text}
								selected={selectedOffer === bestOffer.id}
								onClick={() => selectOffer(bestOffer.id)}
								expired={isPriceExpired}
							/>
						)}

						<div className="flex w-[100%] sm:flex-row flex-col gap-[14px] sm:mt-[14px] mt-0">
							{nonBestOffers.map((offer) => (
								<OfferCard
									key={offer.id}
									id={offer.id}
									period={offer.period}
									price={offer.price}
									fullPrice={offer.full_price}
									isBest={false}
									text={offer.text}
									selected={selectedOffer === offer.id}
									onClick={() => selectOffer(offer.id)}
									expired={isPriceExpired}
								/>
							))}
						</div>

						<div className="flex gap-[8px] pt-[18px] pb-[18px] pl-[20px] pr-[20px] bg-[#2d3233] rounded-[20px] sm:mt-[25px] mt-[12px] sm:w-[500px] w-[100%]">
							<p className="sm:text-[26px] text-[20px] leading-[100%] text-[#fdb056]">!</p>
							<p className="sm:text-[16px] text-[12px] leading-[130%]">Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц</p>
						</div>

						<div className="flex flex-col sm:items-start items-center sm:mt-[27px] mt-[24px] sm:gap-[16px] gap-[20px]">
							<Checkbox
								id="terms-checkbox"
								checked={isAgreed}
								onChange={(val) => {setIsAgreed(val); setShowError(false);}}
								error={showError}
							>
								<p className="sm:text-[16px] text-[12px] text-[#cdcdcd]">Я согласен с <a className="cursor-pointer underline" onClick={(e) => e.preventDefault()}>офертой рекуррентных платежей</a> и <a className="cursor-pointer underline" onClick={(e) => e.preventDefault()}>Политикой конфиденциальности</a></p>
							</Checkbox>
							<button onClick={handleSubmit} className="w-[352px] h-[66px] bg-[#fdb056] rounded-[20] text-[20px] text-[#191e1f] leading-[130%] font-bold cursor-pointer transition-[opacity] active:opacity-50">Купить</button>
						</div>

						<p className="sm:text-[14px] text-[10px] text-[#9b9b9b] leading-[120%] sm:mt-[15px] mt-[20px]">Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.</p>
					</div>
				</div>

				<div className="sm:p-[20px] p-[12px] sm:items-start items-center flex flex-col sm:gap-[30px] gap-[10px] bg-transparent border-[1px] border-[#484d4e] rounded-[30px] sm:mt-[66px] mt-[24px]">
					<div className="w-fit h-fit sm:pt-[16px] pt-[10px] sm:pb-[18px] pb-[12px] sm:pl-[30px] pl-[18px] sm:pr-[30px] pr-[18px] flex items-center justify-center bg-[#2d3233] border-[1px] border-[#81fe95] rounded-[30px]">
						<p className="sm:text-[28px] text-[16] leading-[120%] text-[#81fe95]">гарантия возврата 30 дней</p>
					</div>
					<p className="sm:text-[24px] text-[13px] leading-[130%] text-[#dcdcdc]">Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.</p>
				</div>
			</div>
		</div>
	)
}
