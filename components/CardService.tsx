import Image from "next/image";
type CardServiceProps = {
	title: string;
	description: string;
	image: string;
};

export default function CardService({
	image,
	title,
	description,
}: CardServiceProps) {
	return (
		<div
			className="bg-white rounded-xl shadow p-4 w-60 h-80 md:h-80 md:w-70 mt-2 flex  flex-col items-center md:transition-transform md:duration-300 md:ease-in-out 
            hover:scale-105 cursor-pointer"
		>
			<Image
				src={image}
				alt={title}
				width={90}
				height={90}
				className="rounded-md object-cover"
			/>

			<h3 className="mt-0 font-bold text-2xl mb-2 text-[#6A5A4E] mt-10">
				{title}
			</h3>
			<p className="text-sm text-[#78675a] mt-5">{description}</p>
		</div>
	);
}
