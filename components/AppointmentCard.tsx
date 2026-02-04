type Props = {
	petName: string;
	serviceType: string;
	date: string;
	time: string;
	price: number;
};

export function AppointmentCard({
	petName,
	serviceType,
	date,
	time,
	price,
}: Props) {
	return (
		<div className="bg-[#FBF7F4] rounded-2xl p-5 shadow-sm border border-[#E1D2C6]">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold text-[#6A5A4E]">{petName}</h3>
				<span className="text-[#B99577] font-bold">R$ {price}</span>
			</div>

			<p className="text-sm text-[#8B7766] mt-1">
				{serviceType.replaceAll("_", " ")}
			</p>

			<div className="mt-3 text-sm text-[#6A5A4E]">
				{date} às {time}
			</div>
		</div>
	);
}
