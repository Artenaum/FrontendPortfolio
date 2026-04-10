interface CheckboxProps {
	id: string
	checked: boolean
	onChange: (checked: boolean) => void
	error?: boolean
	children: React.ReactNode
}

const Checkbox = (props: CheckboxProps) => {
	const {id, checked, onChange, error, children} = props

	return (
		<div className="flex items-center gap-[12px]">
			<div className="relative flex items-center">
				<input
					id={id}
					type="checkbox"
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
					className={`appearance-none sm:size-[32px] size-[30px] border-[2px] rounded-[4px] cursor-pointer bg-transparent ${error ? 'border-[#fd5656]' : 'border-[#606566]'}`}
				/>
				{checked && (
					<svg className="absolute left-[6px] top-[9px] pointer-events-none" width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19.4727 0.570312C19.5464 0.491786 19.6674 0.477847 19.7568 0.533203L19.793 0.561523C19.8834 0.647109 19.8879 0.791255 19.8018 0.882812L7.43848 13.9736C7.39461 14.02 7.33545 14.0458 7.27344 14.0459H7.27148C7.22257 14.0452 7.1766 14.0286 7.13867 14.001L7.10352 13.9697L0.558594 6.69727C0.474798 6.60415 0.482343 6.46058 0.575195 6.37695C0.667705 6.29371 0.811212 6.29874 0.898438 6.39453L6.91406 13.0791L7.27734 13.4824L7.64941 13.0879L19.4717 0.571289L19.4727 0.570312Z" fill="#424748" stroke="#FDB056"/>
					</svg>
				)}
			</div>
			<label htmlFor={id} className="sm:text-[16px] text-[12px] leading-[110%]">
				{children}
			</label>
		</div>
	)
}

export default Checkbox